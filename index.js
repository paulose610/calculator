document.addEventListener("DOMContentLoaded", function () {
    const otpt1 = document.querySelector("#sb1 p");
    const otpt2 = document.querySelector("#sb2 p");
  
    let optr=false;
    let dec=true;
    let len=0;
    let n1=null,n2=null,op="";
    const ops=["+","-","/","*"];
    let res=null;
    
    function operate(a,b,c,cc){
        if ((+a)!=NaN && (+b)>0){
        switch (c){
            case "+":
                res=a+(+b);
                break;
            
            case "-":
                res=a-b;
                break;

            case "*":
                res=a*b;
                break;
                    
            case "/":
                res=a/b;
                break;      
        } 
        n2=null;
        op=cc;
        let s=res.toString();
        if (s.length>10 && s.includes(".")){
            if (Number(s)>10000000) s=(+s).toFixed(2).toString()
            else s=(+s).toFixed(5).toString()
        }
        
        if (s.includes(".")){dec=false}
        else dec=true;
        if (op===""){n1=null;optr=true;}
        else {n1=(+s);optr=false;dec=true;}
        
        otpt1.textContent=`${a} ${c} ${b}`;
        otpt2.textContent=s+op;
        len=otpt2.textContent.length; 
    }
    }

    function eqls(a,b,c){
        if (a!=null && (+b)>0 && c!="") operate(a,b,c,"");
    }

    function clear(){
        otpt2.textContent="";
        otpt1.textContent="";
        n1=null;
        n2=null;
        len=0;
        optr=false;
        dec=true;
    }

    function deci(){
        if (dec){
            if (n1){
            if(n2!=null) n2+=".";
            else n2=".";
            }    
            otpt2.textContent+=".";
            dec=false;
            len++;
            }
    }

    function ope(button){
        if (optr && len<15) {
            if (n2===null){
                n1=(+otpt2.textContent);
                op=button.textContent;
                otpt2.textContent+=op;
                optr=false;
                dec=true;
                len++;
            }
            else operate(n1,n2,op,button.textContent);
        }
    }

    function digi(button){
        if (len<15){   
            otpt2.textContent+=button.textContent; optr=true; len++;
            if (n1!=null){
                if (n2===null){n2=button.textContent}
                else {n2+=button.textContent}
            }
        }
    }

    function del(){
        let s=otpt2.textContent.slice(len-1,len);
        if (ops.includes(s)){optr=true;n1=null;n2=null}
        else if (s==="."){dec=true;}
        if (n2!=null){n2=n2.slice(0,n2.length-1)}
        else {n1=null}       
        otpt2.textContent=otpt2.textContent.slice(0,len-1);
        len--;
    }

    const buttons=document.querySelectorAll(".btn");
    buttons.forEach(button=>{
        if (button.classList.contains("dig")) button.addEventListener('click',()=>{digi(button)})
        
        if (button.classList.contains("clr")) button.addEventListener('click',clear);
        
        if (button.classList.contains("dlt")) button.addEventListener("click",del)
        
        if (button.classList.contains("op")) button.addEventListener("click",()=>{ope(button)})
        
        if (button.classList.contains("eql")) button.addEventListener("click",function(){eqls(n1,n2,op);})
        
        if (button.classList.contains("dot")) button.addEventListener("click",deci)
    })

  });
  