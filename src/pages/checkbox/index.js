import { Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import { mockSettingData } from './mock';

// 给每一层对象绑定指定的属性和值
const bundleAttrForData = (target, attrName, initValue) => {
  return target.map((item) => {
    item[attrName] = initValue;
    if (item.children) bundleAttrForData(item.children, attrName, initValue);
    return item;
  });
};

// 添加 checked: false 属性
const setChecked = bundleAttrForData(mockSettingData, 'checked', false);

const PrivilegeSettingCmp = () => {
  const [dataSource, setDataSource] = useState(setChecked);
  const [flatterData, setFlatterData] = useState([]);

  console.log('dataSource----', dataSource);
  // console.log('flatterData', flatterData);

  function translateDataToTree(data, parentId = null) {
    let tree = [];
    let temp;
    data.forEach((item, index) => {
      if (data[index].parentId == parentId) {
        let obj = data[index];
        temp = translateDataToTree(data, data[index].id);
        if (temp.length > 0) {
          obj.children = temp;
        }
        tree.push(obj);
      }
    });
    return tree;
  }

  const flattenTree = (root) => {
    const res = [];

    function dfs(nodes, parent) {
      if (!nodes) {
        return;
      }

      const newChildren = [];

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const { children } = node;

        const newNode = {
          ...node,
          parent,
        };

        res.push(newNode);
        newChildren.push(newNode);
        if (children) {
          dfs(children, newNode);
        }
      }

      if (parent) {
        // eslint-disable-next-line no-param-reassign
        parent.children = newChildren;
      }
    }
    dfs(root);
    const tree = translateDataToTree(res);
    setDataSource(tree);
  };

  useEffect(() => {
    flattenTree(mockSettingData);
  }, []);

  const renderCheckbox = (target, i) => {
    return target.map((item, index) => {
      const style = {
        display: item.block ? 'block' : 'inline',
      };

      const level = i ? `${i}-${index}` : index.toString();

      const findSelf = (e) => {
        console.log('item', item);
        item.checked = !item.checked;
        const setChecked = (item) => {
          Array.isArray(item.children) &&
            item.children.map((subItem) => {
              subItem.checked = item.checked;
              if (subItem.children) {
                setChecked(subItem);
              }
            });
        };

        setChecked(item);

        const setParentChecked = (item) => {
          let parent = item.parent;

          if (parent) {
            let brotherChildren = parent.children;

            if (brotherChildren.length > 0) {
              let allChecked = true;
              brotherChildren.map((bro) => {
                console.log('bro', bro);
                allChecked = allChecked && bro.checked;
              });

              parent.checked = allChecked;
              console.log('parent---', parent);

              setParentChecked(parent);
            }
          }
        };

        // setParentChecked(item);

        // do something
        setDataSource([...dataSource]);
      };

      return (
        <span key={item.id} style={style} className={level}>
          <Checkbox checked={item.checked} ids={level} onChange={findSelf}>
            {item.name}
          </Checkbox>
          {item.children && renderCheckbox(item.children, level)}
        </span>
      );
    });
  };

  return <>{renderCheckbox(dataSource)}</>;
};

export default PrivilegeSettingCmp;
