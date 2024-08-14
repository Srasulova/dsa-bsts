class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    const newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    while (true) {
      if (val < current.val) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, node = this.root) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }

    if (val < node.val) {
      if (!node.left) {
        node.left = new Node(val);
        return this;
      }
      return this.insertRecursively(val, node.left);
    } else {
      if (!node.right) {
        node.right = new Node(val);
        return this;
      }
      return this.insertRecursively(val, node.right);
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let current = this.root;
    while (current) {
      if (val === current.val) return current;
      if (val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, node = this.root) {
    if (!node) return undefined;
    if (val === node.val) return node;
    if (val < node.val) {
      return this.findRecursively(val, node.left);
    } else {
      return this.findRecursively(val, node.right);
    }
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    const visited = [];
    function traverse(node) {
      if (!node) return;
      visited.push(node.val);
      traverse(node.left);
      traverse(node.right);
    }
    traverse(this.root);
    return visited;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    const visited = [];
    function traverse(node) {
      if (!node) return;
      traverse(node.left);
      visited.push(node.val);
      traverse(node.right);
    }
    traverse(this.root);
    return visited;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    const visited = [];
    function traverse(node) {
      if (!node) return;
      traverse(node.left);
      traverse(node.right);
      visited.push(node.val);
    }
    traverse(this.root);
    return visited;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    const visited = [];
    const queue = [this.root];
    while (queue.length) {
      let current = queue.shift();
      visited.push(current.val);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
    return visited;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val, node = this.root, parent = null) {
    if (!node) return undefined;

    if (val < node.val) {
      return this.remove(val, node.left, node);
    } else if (val > node.val) {
      return this.remove(val, node.right, node);
    } else {
      // Node has no children
      if (!node.left && !node.right) {
        if (node === this.root) {
          this.root = null;
        } else if (parent.left === node) {
          parent.left = null;
        } else {
          parent.right = null;
        }
        return node;
      }

      // Node has one child
      if (!node.left || !node.right) {
        const child = node.left ? node.left : node.right;
        if (node === this.root) {
          this.root = child;
        } else if (parent.left === node) {
          parent.left = child;
        } else {
          parent.right = child;
        }
        return node;
      }

      // Node has two children
      let successor = node.right;
      while (successor.left) {
        successor = successor.left;
      }
      node.val = successor.val;
      return this.remove(successor.val, node.right, node);
    }
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    function getHeight(node) {
      if (!node) return -1;
      return Math.max(getHeight(node.left), getHeight(node.right)) + 1;
    }

    function checkBalance(node) {
      if (!node) return true;
      const leftHeight = getHeight(node.left);
      const rightHeight = getHeight(node.right);
      return (
        Math.abs(leftHeight - rightHeight) <= 1 &&
        checkBalance(node.left) &&
        checkBalance(node.right)
      );
    }

    return checkBalance(this.root);
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) return undefined;

    let current = this.root;
    let parent = null;

    while (current.right) {
      parent = current;
      current = current.right;
    }

    // If the current node has a left child, find the maximum value in the left subtree.
    if (current.left) {
      current = current.left;
      while (current.right) {
        current = current.right;
      }
      return current.val;
    }

    // If no left child, return the parent node value.
    return parent ? parent.val : undefined;
  }
}

module.exports = BinarySearchTree;
