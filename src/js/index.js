const products=[
  {id:1,productName:"cover 206",productPrice:"66$",AutoName:"peugeot 206",image:"../../public/images/_DSC5411.png"},
  {id:2,productName:"cover 405",productPrice:"85$",AutoName:"peugeot 206",image:"../../public/images/_DSC5412.png"},
  {id:3,productName:"cover 2008",productPrice:"42$",AutoName:"peugeot 206",image:"../../public/images/_DSC5414.png"},
  {id:4,productName:"cover 504",productPrice:"58$",AutoName:"peugeot 206",image:"../../public/images/_DSC5415.png"},
];
const basketIcon=document.querySelector("#basketIcon");
const backDrop=document.querySelector("#backDrop");
const cart=document.querySelector("#cart");
const productsSection=document.querySelector("#productsSection");
const cancelButton=document.querySelector("#cancelButton");
const basketProductAmount=document.querySelector("#basketProductAmount");


window.addEventListener("DOMContentLoaded",refreshingData)
function refreshingData(){
  let productCard="";
  products.map(item=>{
    let oneCard=`
    <div class="grid grid-cols-2 w-full  gap-x-4 border-2 border-blue-300 rounded-md">
    <div class="bg-blue-500 flex-center p-2">
        <img src=${item.image} />
    </div>
    <div class="relative">
        <div class="flex flex-col item gap-1">
            <p>Product name: ${item.productName}</p>
            <p>product cost: ${item.productPrice}</p>
            <p>Auto: ${item.AutoName}</p>
        </div>
        <div class="absolute bottom-0 right-0">
            <button  data-id=${item.id} class="purchaseBTN border-px border-2 rounded-md bg-blue-500 py-1 px-3 text-xs shadow-md text-white">Add</button>
        </div>
    </div>
</div>`
    productCard+=oneCard;
  });
  productsSection.innerHTML=productCard;


  const purchaseBTN=document.querySelectorAll(".purchaseBTN");
  const purchaseBTNArray=[...purchaseBTN]
  purchaseBTNArray.forEach(item => {
    item.addEventListener("click",()=>{
      item.innerHTML="Added to cart";
      item.disabled = true;
      console.log(basketProductAmount.innerHTML++)
    })
  });

}
cancelButton.addEventListener("click",hideModalFunction);
basketIcon.addEventListener("click",showModalFunction);

function showModalFunction() {
    backDrop.style.display = "block";
    cart.style.top = "20%";
  }
  function hideModalFunction() {
    backDrop.style.display = "none";
    cart.style.top = "-100%";
  }
  function helle(dataset){
    console.log(dataset.id)
  }