// pages/calc/calc.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    screenData:'0',
    id9: '9',
    id8: '8',
    id7: '7',
    id6: '6',
    id5: '5',
    id4: '4',
    id3: '3',
    id2: '2',
    id1: '1',
    id0: '0',
    idC:'clear',
    idB:'back',
    idA:'history',
    idDIV:'/',
    idX:'*',
    idADD:'+',
    idDEL: '-',
    idP: '.',
    idE: '=',
    iconType:"waiting_circle",
    iconColor:"white",
    iconSize:"25",
  },
  // 数字按钮
  clickBtn1:function(event){
     var id=event.target.id
     

     if(this.data.screenData=="0")
     { this.data.screenData=id}
     else{
       this.data.screenData =this.data.screenData +id
     }

     this.setData({
       screenData:this.data.screenData
     })
  },
  // 符号按钮
  clickBtn2:function(event){
    var id =event.target.id
    var sd =this.data.screenData
  
    var i=0
    if(id=="clear"){ //清空
      this.setData({
      screenData:'0'
      })
    }
    else if (id == 'back')//退格
    {
      if (sd.length <2)
      {
        this.setData({
          screenData:'0',
        })
      }
      else{
        this.setData({
          screenData:sd.slice(0,sd.length-1)
        })
      }
    }
    else if (id == "=") //等号计算
    {
      var zzbds=[]//中缀表达式
      var result
      var num=''
      var array=[]
      var lastPoint

      var m 
      for(m in sd){
        if(isNaN(sd[m])==false)
        {
          num+=sd[m]
        }
        else
        {
          lastPoint=sd[m]
          array.push(num)
          array.push(sd[m])
          num=""
        }
      }
      array.push(num)
      
      console.log("array的内容"+array)



      zzbds=this.cal(array)
      console.log("中缀表达式为"+zzbds)
      result=this.call(zzbds)
      console.log("结果为"+result)
      this.setData({
        screenData:result
      })

    }else{

      this.setData({
        screenData:sd+id
      })
    }
  },


  cal:function(sd){//计算表达式

      

      var i=0
      var k
      var arr=[]//符号数组
      var sdr=[]//后缀表达式数组
      if(sd.length==1){
        return sd
      }else{

        for (i = 0; i < sd.length; i++) {//生成中缀表达式
          if (isNaN (sd[i])==false||sd[i]=='.' ){
            sdr.push(sd[i])
            
          }else{
            if (arr.length == 0) {
              arr.push(sd[i])
            } else {
              if(this.getValue(sd[i])>this.getValue(arr[arr.length-1]))
              {
                arr.push(sd[i])
              }else{
                while (this.getValue(sd[i]) <= this.getValue(arr[arr.length - 1]))
                {
                  sdr.push(arr[arr.length - 1])
                  arr.pop()
                  // console.log(arr)
                }
                arr.push(sd[i])
              }
            }
          }
        }

      while(arr.length!=0){
        console.log(arr)
         sdr.push(arr.pop())
      }
      }
      return sdr
  },
  getValue:function(ch)
  {
    var num=0
    switch(ch){
      case "+":
       num=1;
        break;
      case"-":
        num =1;
        break;
      case"*":
        num =2;
        break;
      case"/":
        num =2;
        break;
      default:
      console.log("default");
    }
    return num;
  },

  call:function(zzbds){
    var arr=[]//定义一个栈数组
    var i=0
    var result1=0
    var result2=0
    var result=0
    console.log("zzbds为"+zzbds)

    for(i=0;i<zzbds.length;i++)
    {
      if(isNaN(zzbds[i])==false )
      {
        arr.push(Number(zzbds[i]))
        console.log(zzbds[i]+"是数字")
      }
      else
      {
        result1 = arr.pop()
        result2 = arr.pop()
        
        switch(zzbds[i]){
          case '+':
          result=result2+result1;
          break;

          case '-':
          result = result2 - result1;
          break;

          case '*':
          result = result2 * result1;
          break;

          case '/':
          result = result2 / result1;
          break;

          default: console.log("default");
        }
        arr.push(result)
        console.log(arr)
      }

    }

    console.log(arr)
    return arr.pop()
  },
  




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})