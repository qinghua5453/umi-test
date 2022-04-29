const item1 = {
  id: '2',
  name: '标签管理',
  parentId: null,
  value: [],
  children: [
    {
      id: '3',
      parentId: '2',
      name: '属性',
      seq: 1,
      block: true,
      value: [],
      children: [
        {
          id: '4',
          name: '属性管理',
          parentId: '3',
          seq: 1,
          value: [],
        },
      ],
    },
  ],
};

const mockSettingData = [
  {
    id: '2',
    name: '标签管理',
    parentId: null,
    value: [],
    children: [
      {
        id: '3',
        parentId: '2',
        name: '属性',
        seq: 1,
        block: true,
        value: [],
        children: [
          {
            id: '4',
            name: '属性管理',
            parentId: '3',
            seq: 1,
            value: [],
          },
        ],
      },
    ],
  },
];

export { mockSettingData };
