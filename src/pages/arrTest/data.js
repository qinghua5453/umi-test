const oneData = [
  { id: 1, parentId: null, name: '1' },
  { id: 2, parentId: 1, name: '2' },
  { id: 3, parentId: 2, name: '3' },
  // { id: 4, parentId: 1, name: '4' }
];

// 期望
const multData = [
  {
    id: 1,
    parentId: null,
    name: '1',
    level: 1,
    children: [
      {
        id: 2,
        parentId: 1,
        name: '2',
        level: 2,
      },
      {
        id: 4,
        parentId: 1,
        name: '4',
        level: 2,
        children: [
          {
            id: 5,
            parentId: 4,
            name: '5',
            level: 3,
          },
        ],
      },
    ],
  },
];

export default multData;
