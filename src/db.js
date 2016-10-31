export default [
    {
        id: 1,
        name: 'root',
        left: 100,
        top: 100,
        children: [2],
		parents: []
    },
    {
        id: 2,
        name: 'node1',
        left: 200,
        top: 200,
		children: [3],
		parents: [1]
    },
	{
		id: 3,
		name: 'node2',
		left: 300,
		top: 300,
		children: [],
		parents: [2]
	}
];