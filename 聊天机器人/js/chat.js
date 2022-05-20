$(function(){
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui()
    //为发送按钮绑定鼠标点击事件
    $('#btn').on('click',function(){
        var text=$('#ipt').val().trim()
        if(text.length<=0){
            return $('#ipt').val('')
        }
        $('#talk_list').append('<li class="right_word"><img src="img/person02.png" /> <span>'+text+'</span></li>')
        $('#ipt').val('')
        resetui()
        getMsg(text)
        
        // console.log('ff')
    })
    function getMsg(text){
        $.ajax({
            method:'GET',
            url:'http://www.liulongbin.top:3006/api/robot',
            data:{spoken:text},
            success:function(res){
                if(res.message==='success'){
                    var msg=res.data.info.text
                    $('#talk_list').append('  <li class="left_word"><img src="img/person01.png" /> <span>'+msg+'</span></li>')
                    resetui()
                    getVoice(msg)
                }
                // console.log(res)
            }
        })
    }
    function getVoice(text){
        $.ajax({
            method:'GET',
            url:'http://www.liulongbin.top:3006/api/synthesize',
            data:{text: text},
            success:function(res){
                if(res.message=='success'){
                    $('#voice').attr('src',res.voiceUrl)
                }
                // console.log(res)
            }
        })
    }
    $('#ipt').on('keyup',function(event){
        if(event.keyCode==13){
            $('#btn').click()
            // console.log(13)

        }
    })
})