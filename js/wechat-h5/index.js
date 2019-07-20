var send = document.getElementById('send')
var parent = document.getElementById('content-items')
send.addEventListener('click',function(){ //给send添加一个点击事件
    

    // jq
    var html = $('<li class="content-item">'+
                    '<div class="left-pic">'+
                        '<img src="./images/images/user.jpg" alt="">'+
                    '</div>'+
                    '<div class="message">'+
                        '<p class="name">张小花</p>'+
                        '<p class="detail">晚上一起吃饭</p>'+
                    '</div>'+
                    '<div class="time">'+
                        '<span>下午 3:50</span>'+
                    '</div>'+
                '</li>')
    html.appendTo(parent)


    // 原生js
    // var li = document.createElement('li') //创建一个li标签
    // li.setAttribute('class','content-item')

    // var divPic = document.createElement('div')
    // divPic.setAttribute('class','left-pic')
    // li.appendChild(divPic)

    // var img = document.createElement('img')
    // img.setAttribute('src','./images/images/user.jpg')
    // divPic.appendChild(img)

    // var message = document.createElement('message')
    // message.setAttribute('class','message')
    // li.appendChild(message)

    // var p1 = document.createElement('p1') //创建p标签
    // p1.setAttribute('class','name') 
    // var p1Txt = document.createTextNode('zgs')   //给p标签创建文本结点
    // message.appendChild(p1)
    // p1.appendChild(p1Txt)

    // var p2 = document.createElement('p2')
    // p2.setAttribute('class','detail')
    // var p2Txt = document.createTextNode('吃饭')
    // message.appendChild(p2)
    // p2.appendChild(p2Txt)

    // var time = document.createElement('time')
    // time.setAttribute('class','time')
    // li.appendChild(time)

    // var time0 = document.createElement('time0')
    // time0.setAttribute('class','time0')
    // var time0Txt = document.createTextNode('下午2:00') //给span添加内容
    // time0.appendChild(time0Txt)
    // time.appendChild(time0)

    // parent.appendChild(li)
})