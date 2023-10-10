// const data = [
//   {
//     id: 1,
//     parentId: null,
//     name: '祖父',
//   },
//   {
//     id: 2,
//     parentId: 1,
//     name: '父亲',
//   },
//   {
//     id: 3,
//     parentId: 2,
//     name: '儿子',
//   },
//   {
//     id: 4,
//     parentId: 3,
//     name: '孙子'
//   }
// ];

const data = [
  {
    id: 1,
    parentId: null,
    name: '祖父',
    children: [
      {
        id: 2,
        parentId: 1,
        name: '父亲',
        children: [
          {
            id: 3,
            parentId: 2,
            name: '儿子',
            children: [
              {
                id: 4,
                parentId: 3,
                name: '孙子',
                children: [
                  {
                    id: 6,
                    parentId: 4,
                    name: '孙子的儿子',
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            id: 5,
            parentId: 1,
            name: '儿子1',
            children: [],
          },
        ],
      },
    ],
  },
];

export default data;
