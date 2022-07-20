let allProducts=[];
let filters={
  searchBox:"",
  searchButtons:"0"
};

const basketIcon=document.querySelector("#basketIcon");
const backDrop=document.querySelector("#backDrop");
const cart=document.querySelector("#cart");
const productsSection=document.querySelector("#productsSection");
const cancelButton=document.querySelector("#cancelButton");
const basketProductAmount=document.querySelector("#basketProductAmount");
const serachInput=document.querySelector("#serachInput");
const autosFilterButtons=document.querySelectorAll(".poductsFilterButtonsSection button");
// console.log(autosFilterButtons);



document.addEventListener("DOMContentLoaded",refreshingData)
function refreshingData(){
  axios.get('http://localhost:4000/products')
  .then(data=>{
    allProducts=data.data;
    showingProducts()
  })
  .catch(err=>console.log(err))

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


function showingProducts(){
  let  productCard="";
  allProducts.map(item=>{
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
}

function showingFilteredProducts(){
  let productCard="";
  let filterdProductsBysearchInput=allProducts.filter(product=>{
   return product.productName.toLocaleLowerCase().includes(filters.searchBox);
  });
  let filterdProductsByButtons=filterdProductsBysearchInput.filter(product=>{
    return product.productName.toLocaleLowerCase().includes(filters.searchBox);
   });
  console.log(filterdProductsBysearchInput);
  productsSection.innerHTML="";
  filterdProducts.map(item=>{
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
}


const purchaseBTN=document.querySelectorAll(".purchaseBTN");
const purchaseBTNArray=[...purchaseBTN]
purchaseBTNArray.forEach(item => {
  item.addEventListener("click",()=>{
    item.innerHTML="Added to cart";
    item.disabled = true;
    console.log(basketProductAmount.innerHTML++)
  })
});

serachInput.addEventListener('input', (e) => searchProduct(e));
function searchProduct(e){
  const inputValue=e.target.value;
  filters.searchBox=inputValue;
  showingFilteredProducts();
};


const autosFilterButtonsArray=[...autosFilterButtons];

autosFilterButtonsArray.forEach(button => {
  button.addEventListener("click",()=>{
    filters=button.dataset.id;
    console.log(filters)
    showingProducts()
  })
});
