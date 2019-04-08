<template>

  <div id="app"> 

    <div class="container">
      <div class="item">
        <div class="todolist">
          <div class="title"> ToDoList</div>
          <input type="text" v-model='todo' @keydown="doAdd($event)" ref="userinfo"/>
        </div>
      </div>
    </div>

    <br>

    <div class="playing">
      <div>正进行</div>
      <div>{{waitSize.length}}</div>
    </div>
    <ul class="newadd" id="newadd">
      <li v-for="(item,key) in list" v-if="!item.checked" >
          <input type="checkbox" v-model="item.checked" @change="changeList()" /> {{item.title}}     
          <button @click="removeData(key)" >删除</button>
      </li>
    </ul>
    
    

    <div class="playing">
      <div>已完成</div>
      <div>{{completeSize.length}}</div>
    </div>
    <ul class="ok">      
      <li v-for="(item,key) in list" v-if="item.checked">
        <input type="checkbox"  v-model="item.checked" @change="changeList()" /> {{item.title}}   
        <button @click="removeData(key)" >删除</button>
      </li>
    </ul>
    
  </div>
</template>

<script>
    import storage from './model/storage.js';
  
    // console.log(storage);
    export default {
      data () { 
        return {
          waitSize:[],
          completeSize:[],
          todo:'' ,
          list: []
        }
      },
      methods:{
        doAdd(e){
          if(e.keyCode==13){
              this.list.push({
                title:this.todo,
                checked:false
              })
              this.todo='';
              this.waitSize.push({
                title:this.todo,
                checked:false
              });
          }
          storage.setItem('list',this.list);
          storage.setItem('waitSize',this.waitSize);
          storage.setItem('completeSize',this.completeSize);
        },
        removeData(key){
          this.list.splice(key,1);  //删除数据
          storage.setItem('list',this.list);  //重新保存最新数据
          //置空
          this.waitSize=[];
          this.completeSize=[];
          var list=storage.getItem('list');//获取最新数据
          if(list){  /*注意判断*/
            this.list=list;
          }
          // console.log(this.list);
          for(var i=0;i<this.list.length;i++){//遍历最新数据，根据状态checked往waitSize：[]和completeSize：[]添加数据对象
            if(this.list[i].checked==false){
              this.waitSize.push(this.list[i]);
              storage.setItem('waitSize',this.waitSize);
            }else{
              this.completeSize.push(this.list[i]);
              storage.setItem('completeSize',this.completeSize);
            }
          }
        }, 
        changeList(){
          storage.setItem('list',this.list);
          /* 方法一 */
          // this.waitSize.length=this.waitSize.length-1;
          // this.completeSize.length=this.completeSize.length+1;
          // storage.setItem('waitSize',this.waitSize);
          // storage.setItem('completeSize',this.completeSize);
          /* 方法二*/
          this.waitSize=[];
          this.completeSize=[];
          var list=storage.getItem('list');
          if(list){  /*注意判断*/
            this.list=list;
          }
          console.log(this.list);
          for(var i=0;i<this.list.length;i++){
            if(this.list[i].checked==false){
              this.waitSize.push(this.list[i]);
              storage.setItem('waitSize',this.waitSize);
            }else{
              this.completeSize.push(this.list[i]);
              storage.setItem('completeSize',this.completeSize);
            }
          }
        }
      },
      mounted(){   /*生命周期函数       vue页面刷新就会触发的方法*/
        var list=storage.getItem('list');
        if(list){  /*注意判断*/
          this.list=list;
        }
        for(var i=0;i<this.list.length;i++){
          if(this.list[i].checked==false){
            this.waitSize.push(this.list[i]);
            storage.setItem('waitSize',this.waitSize);
          }else{
            this.completeSize.push(this.list[i]);
            storage.setItem('completeSize',this.completeSize);
          }
        }
      }
    }
    
</script>


<style lang="scss">
@import 'styles/style.css';

</style>