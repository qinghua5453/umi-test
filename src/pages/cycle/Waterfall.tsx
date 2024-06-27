import React, { useRef, useEffect, useState } from 'react';
import UseCalculativeWidth from './useCalculativeWidth';

function deep_JSON<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

// Waterfall.tsx
export interface waterfallItem {
  /**高:宽的大致比例，用于每一轮获取数据时的估计高度 */
  scale: number;
}
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
export default function Waterfall<T extends waterfallItem>(
  props: waterfallProps<T>,
) {
  const { scrollRef, cols = 5, marginX = 30, getList, itemRender } = props;

  /**瀑布流最外层的ref */
  const listRef = useRef<HTMLDivElement>(null);
  /**每一列的ref。是个数组 */
  const colRef = useRef<(HTMLDivElement | null)[]>([]);
  /**瀑布流每个模块的宽度。随着窗口大小变化而变化 */
  const imgWidth = UseCalculativeWidth(listRef, marginX, cols);

  const [list, setList] = useState<T[]>([]); //用来暂时存储获取到的最新list。
  const [colList, setColList] = useState(
    Array.from({ length: cols }, () => new Array<T>()),
  ); //要展示的图片列表，二维数组
  const [colHeight, setColHeight] = useState(new Array<number>(cols).fill(0)); //当前每一列的高度

  /**获取列表数据 */
  const _getList = async () => {
    const res = await getList();
    setList(res);
  };
  /**把获取到的列表，按照规律放入二维数组中。 注，需要监听list的变化，再做这个函数，否则无法获取到最新的colList */
  const listToColList = (list: T[]) => {
    const _colList = deep_JSON(colList); //进行深拷贝
    const _colHeight = deep_JSON(colHeight);
    for (let i = 0; i < list.length; i++) {
      //获取当前最短的列表
      let minHeight = Infinity;
      let minHeightindex = 0;
      _colHeight.forEach((k, i) => {
        if (k < minHeight) {
          minHeight = k;
          minHeightindex = i;
        }
      });
      //加上预估的高度，便于下一个元素正确插入
      _colHeight[minHeightindex] += imgWidth * list[i].scale; //预估的图片高度，后面会更换为真实高度
      _colList[minHeightindex].push(list[i]);
    }
    setColList(_colList);

    //tip: 计算真实高度的函数，在下面的useEffect中，这样才能保证获取到渲染后的数据
  };

  useEffect(() => {
    _getList();
  }, []);
  useEffect(() => {
    listToColList(list); // 需要监听list的变化，再做这个函数，否则无法获取到最新的colList
  }, [list]);
  useEffect(() => {
    //当数据渲染后，再去计算真实高度
    if (colRef.current) {
      const newHeight = colRef.current.map((k) => k?.offsetHeight || 0);
      setColHeight(newHeight);
    }
  }, [colList]);

  return (
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
  );
}
