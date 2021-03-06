    status="";
    objects=[];
    function preload(){
        alarm = loadSound("Alarm.mp3");
    }
    function setup(){
        canvas=createCanvas(380,380);
        canvas.center();
        video=createCapture(VIDEO);
        video.size(380,380);
        video.hide();
        o_d=ml5.objectDetector("cocossd",modelLoded);
        document.getElementById("status").innerHTML="Status: Detecting Object";
    }
    function modelLoded(){
        console.log("Moodaal Loodaad");
        status=true;

    }
    function gotResult(error,results){
        if(error){
            console.log(error);
        }
        else{
            console.log(results);
            objects=results;
        }
    }
    function draw(){
        image(video,0,0,380,380);
        if(status != ""){
            r = random(255);

            g = random(255);

            b = random(255);

            o_d.detect(video,gotResult);

            
            for(i=0; i<objects.length; i++){
                if(objects[i].label=="person"){
                document.getElementById("status").innerHTML="Status: Object Detected";
                document.getElementById("baby_status").innerHTML="Baby Found";
                fill(r,g,b);
                percent=floor(objects[i].confidence*100);
                text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
                noFill();
                stroke(r,g,b);
                rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
                }
                else{
                    document.getElementById("baby_status").innerHTML="Baby Not Found";
                    alarm.play()
                }

            }
            
        }
    }

    
    