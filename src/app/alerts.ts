import Swal from 'sweetalert2'
export class Alerts{
    static success(text: string){
        Swal.fire({
            title:'success',
            text,
            icon:'success'
        })
    }
    static error(text:string){
        Swal.fire({
            title:'error',
            text,
            icon:'error'
        })
    }
    static confirm(text:string, callback: Function){
        Swal.fire({
         title: "Are you sure?",
         text,
         icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
        callback()
         }
        })
    }
 }
