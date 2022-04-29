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
            children: [
              {
                id: '4-1',
                name: '批量操作',
                parentId: '4',
                seq: 1,
                value: [],
              },
              {
                id: '4-2',
                name: '查看详情',
                parentId: '4',
                seq: 2,
                value: [],
              },
              {
                id: '4-3',
                name: '调整分组',
                parentId: '4',
                seq: 3,
                value: [],
              },
            ],
          },
        ],
      },

      // {
      //   id: '3-2',
      //   parentId: 2,
      //   name: '标签',
      //   seq: 2,
      //   block: true,
      //   children: [
      //     {
      //       id: '5-1',
      //       name: '标签管理',
      //       parentId: '3-2',
      //       children: [
      //         {
      //           id: '6-1',
      //           name: '新建标签',
      //           parentId: '5-1'
      //         },
      //         {
      //           id: '6-2',
      //           name: '编辑标签',
      //           parentId: '5-1'
      //         },
      //         {
      //           id: '6-3',
      //           name: '删除标签',
      //           parentId: '5-1'
      //         },
      //         {
      //           id: '6-4',
      //           name: '复制标签',
      //           parentId: '5-1'
      //         },
      //         {
      //           id: '6-5',
      //           name: '查看详情',
      //           parentId: '5-1'
      //         },
      //         {
      //           id: '6-6',
      //           name: '手动执行',
      //           parentId: '5-1'
      //         }
      //       ]
      //     },
      //   ]
      // }
    ],
  },
];

export { mockSettingData };
