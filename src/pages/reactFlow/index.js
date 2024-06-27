import ReactFlow, { useNodesState, useEdgesState } from 'reactflow';
import * as d3 from 'd3';

const reactFlowCmp = () => {
  const _nodes = [
    { id: '1', data: { label: '中心节点' }, position: { x: 0, y: 0 } },
    { id: '2', data: { label: '节点 2' }, position: { x: 200, y: 100 } },
    { id: '3', data: { label: '节点 3' }, position: { x: -200, y: 100 } },
    { id: '4', data: { label: '节点 4' }, position: { x: 100, y: 200 } },
    { id: '5', data: { label: '节点 5' }, position: { x: -100, y: 200 } },
  ];

  const _edges = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e1-3', source: '1', target: '3' },
    { id: 'e2-4', source: '2', target: '4' },
    { id: 'e3-5', source: '3', target: '5' },
  ];
  const [nodes, setNodes, onNodesChange] = useNodesState(_nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(_edges);

  useEffect(() => {
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3.forceLink(edges).id((d) => d.id),
      )
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(0, 0))
      .on('tick', () => {
        setNodes((nds) =>
          nds.map((node) => {
            return {
              ...node,
              position: { x: node.position.x, y: node.position.y },
            };
          }),
        );
      });

    return () => {
      simulation.stop();
    };
  }, [nodes, edges, setNodes]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
    ></ReactFlow>
  );
};

export default reactFlowCmp;
