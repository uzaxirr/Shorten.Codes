const input = document.querySelector('input')
const btn = document.querySelector('.btn-success')
const listitem = document.querySelector('ul')

btn.addEventListener('click' , () => {
    // console.log('clicked');
    let list = document.createElement('li')
    listitem.appendChild(list, ad)
    list.setAttribute("contenteditable" ,"false")
    list.innerHTML = input.value
    
})

// function addnewlink(){
//   let newdiv = document.createElement('div')
//   newdiv.style.backgroundColor('black')
// }

// btn.addEventListener('click', () => {
//     let addlinkbtn = document.createElement('button')
//     listitem.appendChild(addlinkbtn)
//     addlinkbtn.innerHTML = '<i class="bi bi-link"></i> Copy Link'
//     addlinkbtn.classList.toggle('btn-primary')
//     let del_linkbtn = document.createElement('button')
//     listitem.appendChild(del_linkbtn)
//     del_linkbtn.innerHTML = '<i class="bi bi-trash"></i> Delete Link'
//     del_linkbtn.classList.toggle('btn-danger')
// })