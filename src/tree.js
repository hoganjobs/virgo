var BinTreeNode = function(data){
  this.data = data;
  this.leftChild = null;     // 左孩子
  this.rightChild = null;    // 右孩子
  this.parentNode = null;    // 父节点
};
// 采用广义表表示的建立二叉树方法
this.init_tree = function(string){
  var stack = new Stack.Stack();
  var k = 0;
  var new_node = null;
  for(var i =0; i < string.length;i++){
      var item = string[i];
      if(item == "#"){
          break;
      }
      if(item=="("){
          stack.push(new_node);
          k = 1;
      }else if(item==")"){
          stack.pop();
      }else if(item==","){
          k = 2;
      }else{
          new_node = new BinTreeNode(item);
          if(root==null){
              root = new_node;
          }else if(k==1){
              // 左子树
              var top_item = stack.top();
              top_item.leftChild = new_node;
              new_node.parentNode = top_item;
          }else{
              // 右子树
              var top_item = stack.top();
              top_item.rightChild = new_node;
              new_node.parentNode = top_item;
          }
      }
  }
};