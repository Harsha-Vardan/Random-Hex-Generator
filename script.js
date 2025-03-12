const generate = document.querySelector('.generate');
const details = document.querySelector('.code');
const HexChar = "0123456789abcdef";
const recentColors = document.querySelector('.recent-colors');
const arrayColors = [];
const generateHex = ()=>{
   let code = "#";
   for(let i=0;i<6;++i){
     let r = Math.floor(Math.random()*HexChar.length);
     code+=HexChar[r];
   }
   document.body.style.backgroundColor = code;
   details.innerHTML = `<h2 class="PresentColor">HexCode : ${code}</h2>`;
   arrayColors.push(code);
   if(arrayColors.length>5) arrayColors.shift();
   updateColors();
};
const reset = ()=>{
    document.body.style.backgroundColor = "";
    details.innerHTML="";
    recentColors.innerHTML="";
    arrayColors.length=0;
};
const updateColors = ()=>{
    recentColors.innerHTML = "";
   arrayColors.forEach(color=>{
    const colorDiv = document.createElement('div');
    colorDiv.style.backgroundColor = color;
    colorDiv.style.width = "50px";
    colorDiv.style.height = "50px";
    colorDiv.style.margin = "5px";
    colorDiv.style.cursor="pointer";
    colorDiv.title=color;
    colorDiv.addEventListener('mouseover',()=>{
        document.body.style.backgroundColor = color;
        details.innerHTML = `<h2 class="PresentColor" data-hex="${color}">HexCode : ${color}</h2>`;
    });
    colorDiv.addEventListener("click", () => {
      document.body.style.backgroundColor = color;
      details.innerHTML = `<h2 class="PresentColor" data-hex="${color}">HexCode : ${color}</h2>`;
  });
    recentColors.appendChild(colorDiv);
   });
};
details.addEventListener('mouseover',(event)=>{
   if(event.target.classList.contains('PresentColor')){
    const hex = event.target.getAttribute('data-hex');
    if(hex){
      navigator.clipboard.writeText(hex)
    .then(()=>{
      const originalText = event.target.textContent;
      event.target.textContent = originalText + "(copied!)";
      setTimeout(()=>{
        event.target.textContent = originalText;
      },1000);
    })
    .catch(err=>console.log("Failed to copy!",err));
    }
   }
});
document.addEventListener("click", generateHex);
document.addEventListener('keydown' ,(event)=>{
  if(event.key==='Enter') generateHex();
  if(event.key==='Escape') reset();
})
