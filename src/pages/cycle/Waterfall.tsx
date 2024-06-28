import React, { useRef, useEffect, useState } from 'react';
import UseCalculativeWidth from './useCalculativeWidth';

function deep_JSON<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

// Waterfall.tsx
/**瀑布流组件的props */
export interface waterfallProps<T> {
  /**本组件的外层的ref。用于监听元素的滚动（谁滚动就填谁） */
  scrollRef: any;
  /**一行个数（要多少列）默认5*/
  cols?: number;
  /**每列之间的间距，默认30 */
  marginX?: number;
  /**下拉触底、组件初次渲染时，触发的函数。用来获取新一轮的数据，需要return出新列表 */
  getList: () => Promise<T[]>;
  /**元素的渲染函数 */
  itemRender: (item: T, i: number) => React.ReactNode;
}
/**展示瀑布流的组件  */
export default function Waterfall<T>(props: waterfallProps<T>) {
  const { scrollRef, cols = 5, marginX = 30, getList, itemRender } = props;

  /**瀑布流最外层的ref */
  const listRef = useRef<HTMLDivElement>(null);
  const listFlatItemHiddenRef = useRef<(HTMLDivElement | null)[]>([]);
  /**每一列的ref。是个数组 */
  const colRef = useRef<(HTMLDivElement | null)[]>([]);
  /**瀑布流每个模块的宽度。随着窗口大小变化而变化 */
  const imgWidth = UseCalculativeWidth(listRef, marginX, cols);

  const [list, setList] = useState<T[]>([]); //用来暂时存储获取到的最新list。
  const [colList, setColList] = useState(
    Array.from({ length: cols }, () => new Array<T>()),
  ); //要展示的图片列表，二维数组
  console.log('colList', colList);
  console.log('listFlatItemHiddenRef', listFlatItemHiddenRef);

  /**获取列表数据 */
  const _getList = async () => {
    const res = await getList();
    setList(res);
  };
  /**把获取到的列表，按照规律放入二维数组中。 注，需要监听list的变化，再做这个函数，否则无法获取到最新的colList */
  const listToColList = (list: T[]) => {
    const _colList = deep_JSON(colList); //进行深拷贝
    const _colHeight = new Array<number>(cols).fill(0);
    for (let i = 0; i < list.length; i++) {
      // 获取当前最短的列表
      let minHeight = Infinity;
      let minHeightindex = 0;
      const h = listFlatItemHiddenRef.current[i]?.offsetHeight as number;
      const w = listFlatItemHiddenRef.current[i]?.offsetWidth as number;
      const scale = h / w;
      console.log('h', h, 'w', w);
      _colHeight.forEach((k, i) => {
        if (k < minHeight) {
          minHeight = k;
          minHeightindex = i;
        }
      });
      _colHeight[minHeightindex] += imgWidth * scale; //预估的图片高度，后面会更换为真实高度
      _colList[minHeightindex].push(list[i]);
    }
    setColList(_colList);
  };

  useEffect(() => {
    _getList();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (listFlatItemHiddenRef.current) {
        listToColList(list);
      }
    }, 300);
  }, [list, listFlatItemHiddenRef]);

  return (
    // 先隐藏渲染一次，拿到各个dom的真实宽高
    <>
      <div style={{ visibility: 'hidden', height: 0 }}>
        {list.map((k, i) => {
          return (
            <div key={i} ref={(r) => (listFlatItemHiddenRef.current[i] = r)}>
              {itemRender(k, i)}
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'space-evenly',
          textAlign: 'center',
        }}
        ref={listRef}
      >
        {colList.map((list, listI) => {
          return (
            <div
              key={listI}
              ref={(r) => (colRef.current[listI] = r)}
              style={{ width: imgWidth }}
            >
              {list.map((k, i) => {
                return itemRender(k, i);
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}
