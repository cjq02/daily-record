const TreeUtils = {
	
	/**
	 * 列表转化为树
	 * 
	 * @param array 列表
	 * @param nodeMap 节点属性映射
	 * */
	listToTree(array, nodeMap) {
		nodeMap = nodeMap || {
			value: 'id',
			label: 'name'
		};
		array = _.map(array, item => {
			return {
				id: item.id,
				value: item[nodeMap.value],
				label: item[nodeMap.label],
				parentId: item.parentId
			}
		});

		let unflatten = (array, parent, tree) => {
			tree = typeof tree !== 'undefined' ? tree : [];
			parent = typeof parent !== 'undefined' ? parent : {
				id: null
			};

			var children = _.filter(array, (child) => {
				return child.parentId === parent.id;
			});

			if (!_.isEmpty(children)) {
				if (parent.id === null) {
					tree = children;
				} else {
					parent['children'] = children
				}
				_.each(children, (child) => {
					unflatten(array, child)
				});
			}

			return tree;
		}

		return unflatten(array);
	},

	/**
	 * 根据ID获取该节点
	 * 
	 * @param tree 树
	 * @id 节点ID
	 * */
	getNodeById(tree, id) {
		let root = tree;
		if (!tree.children && tree.length > 0) {
			root = {id: null, children: tree};
		}
		
		let getTreeNodeById = (tree, id) => {
			let result = null;
			if (id === tree.id) {
				return tree;
			}
			if (tree.children) {
				tree.children.some(node => result = getTreeNodeById(node, id));
			}
			return result;
		}
		
		return getTreeNodeById(root, id);
	},
	
	/**
	 * 传末级节点，获取该节点及其祖宗节点在各层级的索引
	 * 
	 * @param tree 树
	 * @id 节点ID
	 * */
	getTreeLevelIndexes(tree, id) {
		let indexes = [];
		
		if (_.isEmpty(tree)) {
			return indexes;
		}
		
		if (_.isEmpty(id)) {
			return indexes;
		}
		
		let getIndexes = (tree, id) => {
			if (_.isNull(id)) {
				return indexes;
			}
			
			let node = this.getNodeById(tree, id);
			let parent = this.getNodeById(tree, node.parentId);	
			indexes.unshift(_.findIndex(parent.children, {id: node.id}));
			return getIndexes(tree, parent.id);
		};
		return getIndexes(tree, id);
	}

};

export default TreeUtils;
