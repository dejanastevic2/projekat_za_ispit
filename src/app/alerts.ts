import Swal from 'sweetalert2'
const matCustomClass={
    popup:'mat-swall-popup',
    title: 'mat-swall-title',
    actions:'mat-swall-actions',
    confirmButton:'mat-swall-confirm',
    cancelButton:'mat-swall-cancel'

}
export class Alerts{
    static success(text: string){
        Swal.fire({
            title:'success',
            text,
            icon:'success',
            customClass: matCustomClass
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
        confirmButtonText: "Yes, delete it!",
        customClass: matCustomClass

    }).then((result) => {
        if (result.isConfirmed) {
        callback()
         }
        })
    }
 }
