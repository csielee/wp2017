function setUIa(target,duration,callback) {
	// add uidiv to target
	$(target).append('<div class="UImask"></div>');
	var uidiv = target + " > .UImask";

	$(uidiv).css("height","100%");
	$(target).children(".title").css("opacity" ,"0");

	$(uidiv).each(function(index,element){
		TweenLite.to(element,duration/2,{
			width : "100%" ,
			delay : index*0.2,
			onComplete : function(index,element) {

				TweenLite.to($(element).parent().children(".title"),duration*1.5/2,{
					opacity : 1,
					delay : 0.1
				});
				

				TweenLite.to(element,duration/2,{
					width : 0,
					left : "100%",
					onComplete : function(index,element) {
							$(element).remove();
							if (callback && typeof(callback) == "function")
							callback();
						},
					onCompleteParams : [index,element]
				});  
			},
			onCompleteParams : [index,element]
		});
	});
}

function setUIb(target,duration,complete) {
	$(target).append('<div class="UImask"></div>');
	
		var uidiv = target + " > .UImask";
	
		$(uidiv).css("height","1%");
		
		$(uidiv).each(function(index,element){
			TweenLite.to(element,duration/2,{
				width : "100%" ,
				onComplete : function(index,element) {
					TweenLite.to(element,duration/4,{
						height : "100%",
						onComplete : function(index,element) {
							if (complete && typeof(complete) == "function")
								complete();
							TweenLite.to(element,duration/4,{
								height : 0,
								delay : index*0.1,
								top : "100%",
								onComplete : function(index,element) {
									$(element).remove();
								},
								onCompleteParams : [index,element]
							});  
						},
						onCompleteParams : [index,element]
					});      
				},
				onCompleteParams : [index,element]
			});
		});
}

$(document).ready(function(){

	setUIa(".divbutton",2,function() {

	});
	//setUIb("body",2,function() {console.log("b finish !");});

	var prevButton,atHome = true;
	

	$(".divbutton").on("click", function() {
		if (prevButton) {
			var _p = $(prevButton);
			if(_p.is(this) || _p.has(this).length!=0)
				return false;
		}

		var button = this;
		setUIb("body",2,function() {
			if ($(prevButton))
				$(prevButton).removeClass("divbuttonAnimation");

			$(button).addClass("divbuttonAnimation");
			prevButton = button;

			atHome = false;
		});

		return false;
	});

	$("body").on("click",  (e) => {
		if (!atHome && $(prevButton)) {
			prevButton = $(prevButton);
			if(!prevButton.is(e.target) && prevButton.has(e.target).length === 0) {
				prevButton.removeClass("divbuttonAnimation");
				prevButton = null;
				setUIa(".divbutton",2,null);
				atHome = true;
			}
		}
		return false;
	});

  var answernumber = parseInt(Math.random()*100);
  var a = 1,b = 100;
  $("#hitmessage").first().text("請輸入" + a + "與" + b + "之間的數字");

	$(".ajaxform").children("button[type=submit]").click(() => {
		console.log("click!");
    var guess = parseInt($("input[name=guessnumber]").val());
    if (isNaN(guess) || !(a <= guess && guess <= b)) {
      $("#answermessage").text(guess + "不是" + a + "與" + b + "之間的數字唷");
      return;
    }

		$.ajax({
			method : "POST",
			data : {
				guessnumber : guess,
        answer : answernumber,
			},
			url : 'https://luffy.ee.ncku.edu.tw/~csielee/ajax.php',
			success : (data) => {
        console.log(data);
        if (data.status == "correct") {
          answernumber = parseInt(Math.random()*100);
          a = 1;
          b = 100;
        }
        if (data.status == "big")
          b = guess - 1;
        if (data.status == "small")
          a = guess + 1;

				$("#answermessage").text(data.text);
        $("#hitmessage").text("請輸入" + a + "與" + b + "之間的數字");
			},
		});
		$("#answermessage").html('<button class="ui loading button">Loading</button>');
	});
});
