export default class Graph {
	constructor(nodes) {
		this.nodes = nodes || [];
		this.structure = [];

		if (this.nodes.length === 0) {
			this.nodes.push(this.createNode('root'));
		}

		this._updateStructure();
	}

	insertNode(parentId, name) {
		const parentNode = this.getNodeById(parentId);
		const newNode = this.createNode(name);

		parentNode.children.add(newNode.id);
		newNode.parents.add(parentNode.id);
		this.nodes.push(newNode);

		this._updateStructure();
	}

	deleteNodeHard(id) {
		const deletedNode = this.getNodeById(id);
		const deletedNodeIndex = this.getNodeIndexById(id);

		if (deletedNode.parents.size === 0) {
			throw Error('You can\'t delete root element');
		}

		deletedNode.children.forEach(childId => {
			this.deleteNodeHard(childId);
		});

		deletedNode.parents.forEach(parentId => {
			const parent = this.getNodeById(parentId);

			parent.children.delete(id);
		});

		this.nodes.splice(deletedNodeIndex, 1);

		this._updateStructure();
	}

	deleteNodeSoft(id) {
		const deletedNode = this.getNodeById(id);
		const deletedNodeIndex = this.getNodeIndexById(id);

		if (deletedNode.parents.size === 0) {
			throw Error('You can\'t delete root element');
		}

		deletedNode.parents.forEach(parentId => {
			const parent = this.getNodeById(parentId);
			parent.children.delete(id);

			deletedNode.children.forEach(childId => {
				parent.children.add(childId);
			});
		});

		deletedNode.children.forEach(childId => {
			const child = this.getNodeById(childId);
			child.parents.delete(id);

			deletedNode.parents.forEach(parentId => {
				child.parents.add(parentId);
			})
		});

		this.nodes.splice(deletedNodeIndex, 1);

		this._updateStructure();
	}

	createNode(name) {
		return {
			id: this.getNewId(),
			name: name,
			left: 0,
			top: 0,
			children: new Set(),
			parents: new Set()
		}
	}

	getNewId() {
		let maxId = 0;

		this.nodes.forEach(node => {
			if (node.id > maxId) {
				maxId = node.id;
			}
		});

		return maxId + 1;
	}

	getNodeById(id) {
		return this.nodes.find(node => node.id === id);
	}

	getNodeIndexById(id) {
		let result = -1;

		for (let i = 0; i < this.nodes.length; i++) {
			if (this.nodes[i].id === id) {
				result = i;
				break;
			}
		}

		return result;
	}

	getRootNode() {
		return this.nodes.find(node => node.parents.size === 0);
	}

	_updateStructure() {
		const rootNode = this.getRootNode();
		const startLevel = 0;
		this.structure = [];

		this.walkDown(rootNode.id, startLevel, (nodeId, level) => {
			if (!this.structure[level]) {
				this.structure[level] = [];
			}

			this.structure[level].push(nodeId);
		});

		this._calculatePositions();
	}

	_calculatePositions() {
		this.structure.forEach((nodeIds,level) => {


			const horizontalMargin = window.innerWidth/(nodeIds.length + 1);
			const verticalMargin = 100;

			nodeIds.forEach((nodeId, i) => {
				const node = this.getNodeById(nodeId);

				node.left = horizontalMargin * (i + 1);
				node.top = verticalMargin * (level + 1);
			});
		})
	}

	setPosition(id, x, y) {
		const node = this.getNodeById(id);

		node.left = x;
		node.top = y;
	}

	walkDown(nodeId, level, callback) {
		const curNode = this.getNodeById(nodeId);

		callback(nodeId, level);

		curNode.children.forEach(childId => {
			this.walkDown(childId, level + 1, callback);
		})
	}
}