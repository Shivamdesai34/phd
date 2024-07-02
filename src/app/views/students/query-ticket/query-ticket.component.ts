import {Component, OnDestroy, OnInit} from '@angular/core';
import {UntypedFormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {GridOptions} from 'ag-grid-community';
import {PdfCellCustomComponent} from '../../pdfcell-custom/pdfcell-custom.component';
import {QueryTicketService} from './query-ticket.service';
import Swal from 'sweetalert2';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {GlobalMessage} from "../../../globals/global.message";
import {Editor} from 'ngx-editor';
import {ITicketdetails, ITicketmaster} from "../../../models/response";
import {CommonService} from "../../../globals/common.service";
import {createticket, ticketaction, ticketcategory, ticketdetails, ticketmaster} from "../../../globals/global-api";

@Component({
    selector: 'app-query-ticket',
    templateUrl: './query-ticket.component.html',
    styleUrls: ['./query-ticket.component.scss'],
    providers: [QueryTicketService],
})


export class QueryTicketComponent implements OnInit {
    private gridApi: any;
    private gridColumnApi: any;
    gridOptions: any;
    SelectedCategory: any;
    Category: any;
    EditorForm!: FormGroup;
    ListEditorForm!: FormGroup;

    editor!: Editor;
    html!: '';
    DownloadUploadForm!: any;
    visible = false;
    selectedRows: any;
    private anyFile!: Array<File>;
    public rowSelection: 'single' | 'multiple' = 'single';
    detailticket!: ITicketdetails[];

    AadharSession = parseInt(sessionStorage.getItem('Aadhaar')!);
    FinyearSession = parseInt(sessionStorage.getItem('Finyear')!);
    BatchCode = parseInt(sessionStorage.getItem('BatchCode')!);
    TokenSession = sessionStorage.getItem('Token');
    admin = parseInt(sessionStorage.getItem('Adminname')!);

    constructor(private router: Router,private commonService: CommonService,
                private Queryticketservice: QueryTicketService,
                private globalmessage: GlobalMessage,
                private formBuilder: UntypedFormBuilder) {


        this.gridOptions = <GridOptions>{
            context: {
                componentParent: this
            }
        };
    }

    counter(i: number) {
        return new Array(i);
    }

    ngOnInit(): void {
        if (!this.AadharSession) {
            this.openYesNoDialog("Please Login!")
            // alert("Please Login!")
            this.router.navigate(['login']);
        } else {
            this.GetCategoryAPI();
            this.editor = new Editor();
        }
        this.EditorForm = new FormGroup({
            'subject': new FormControl('', Validators.required),
            'category': new FormControl('', Validators.required),
            'texteditor': new FormControl('', Validators.required),

        })
        this.ListEditorForm = new FormGroup({
            'texteditorone': new FormControl('', Validators.required),
        })
        this.GridListApi();
    }

    //Grid
    columnData = [
        // {
        //   field: '',
        //   maxWidth: 50, checkboxSelection: true
        // },
        {headerName: "Subject Name", minWidth: 600, field: "Subject_name", resizable: true},
        {headerName: "Marks", minWidth: 500, field: "Marks", resizable: true},
        {headerName: "Present Absent", field: "Present_absent", resizable: true},
        // { headerName: 'Documents', field: 'Document_Filename ', cellRendererFramework: PdfCellCustomComponent }
    ];


    rowData: any = [];

    onGridReady(params: any) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
    }

    onRowSelectedEvent(event: any) {//on checkbox selection
        // console.log("row select", event.data)
    }

    Batch_code: any;

    onSelectionChanged(event: any) {
        this.selectedRows = this.gridApi.getSelectedRows();
        console.log("Selection change data:", this.selectedRows);
    }

    openYesNoDialog(msg: any) {
        this.globalmessage.Show_message('OK')
    }


    //editor
    editorConfig: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        height: 'auto',
        // height: '15rem',
        minHeight: '15rem',
        maxHeight: 'auto',
        width: 'auto',
        minWidth: '0',
        translate: 'yes',
        enableToolbar: true,
        showToolbar: true,
        placeholder: 'Enter text here...',
        defaultParagraphSeparator: '',
        defaultFontName: '',
        defaultFontSize: '',
        fonts: [
            {class: 'arial', name: 'Arial'},
            {class: 'times-new-roman', name: 'Times New Roman'},
            {class: 'calibri', name: 'Calibri'},
            {class: 'comic-sans-ms', name: 'Comic Sans MS'}
        ],
        customClasses: [
            {
                name: 'quote',
                class: 'quote',
            },
            {
                name: 'redText',
                class: 'redText'
            },
            {
                name: 'titleText',
                class: 'titleText',
                tag: 'h1',
            },
        ],
        // uploadUrl: 'v1/image',
        // upload: (file: File) => { ... }
        uploadWithCredentials: false,
        sanitize: false,
        toolbarPosition: 'top',
        toolbarHiddenButtons: [
            ['bold', 'italic'],
            ['fontSize']
        ]
    };


    GetCategoryAPI() {
        this.commonService.Post_json(ticketcategory,"").subscribe((response: any) => {
            if (response['data'] == '' || response['data'] == null) {
                Swal.fire({title: 'Error!', text: 'No data found!', icon: 'error', confirmButtonText: 'OK'})//alert
            } else {
                this.Category = response['data'];
            }
        })
    }

    onChangeCategorySelect() {
    }

    Ticketkeyword = this.detailticket;

    querydata: any;
    rowss: any = [];
    columnDefs = [
        {
            field: '', maxWidth: 50, checkboxSelection: true
        },
        // { headerName: "Sgpa Id", field: "Sgpa_id", resizable: true, },
        {headerName: "Ticked ID", field: "Ticketid", resizable: true},
        {headerName: "Date", field: "Ticketdate", resizable: true},
        {headerName: "Ticket status", field: "Ticketstatus", resizable: true},
        {headerName: "Assigned user", field: "Assigneduser", resizable: true},
        // {headerName: "College Code", field: "Collegecode", resizable: true},
        // {headerName: "Finyear", field: "Finyear", resizable: true},
        // {headerName: "Aadhaar", field: "Aadhaar", resizable: true},
        // {headerName: "Replay", field: "Aadhaar", resizable: true},
        // {headerName: "Category", field: "Category", resizable: true},
        // {headerName: "Ticket subject", field: "Ticketsubject", resizable: true},
        // {headerName: "Ticket description", field: "Ticketdescription", resizable: true},
        {headerName: "Replay user", field: "Replayuser", resizable: true},

    ]
    paginationPageSize: any;

    onSubmitClick() {

        let formdata = new FormData();
        formdata.append('Finyear', sessionStorage.getItem('Finyear')!);
        formdata.append('Collegecode', '1');
        formdata.append('Aadhaar', sessionStorage.getItem('Aadhaar')!);
        formdata.append('Category', this.SelectedCategory.Category);
        formdata.append('Ticketsubject', this.EditorForm.controls['subject'].value);
        formdata.append('Ticketdescription', this.EditorForm.controls['texteditor'].value.replace(/<[^>]*>/g, ''));

        if (this.anyFile.length) {
            for (let i = 0; i < this.anyFile.length; i++)
                formdata.append('Files[]', this.anyFile[i], this.anyFile[i].name);
        }

        console.log("querydata:", formdata);
        this.commonService.Post_formdata(createticket,formdata).subscribe(response => {
            console.log(response);
            if (response == true) {
                this.openYesNoDialog("Your Ticket is Submitted Successfully!")
            } else {
                Swal.fire({title: 'Error!', text: response.exception, icon: 'error', confirmButtonText: 'OK'})//alert

            }

        })


    }

    GridListApi() {
        let x: ITicketmaster[];
        let jsonin = {
            'Finyear': this.FinyearSession,
            'Collegecode': 1,
            'Aadhaar': this.AadharSession,
        };
        this.commonService.Post_json(ticketmaster,jsonin).subscribe((response) => {
            if (response == null) {
                return;
            }
            this.gridOptions.api.setRowData(response);
        })
    };

    ShowTicket() {

        this.visible = !this.visible;

        let xyz = JSON.stringify(this.selectedRows)
        let jsonObj = JSON.parse(xyz);

        let jsonin = {
            Ticketid: parseInt(jsonObj[0].Ticketid),
        }
        {
            this.commonService.Post_json(ticketdetails,jsonin).subscribe((response) => {
                    if (response == null) {
                        return;
                    }
                    this.detailticket = response
                }
            );
        }
    }

    // masterTicket(){
    //     this.Queryticketservice.ticketMaster(this.querydata).subscribe(response => {
    //         console.log(response);
    //         if (response.data == true) {
    //             this.openYesNoDialog("Your Ticket is Submitted Successfully!")
    //         } else {
    //             Swal.fire({title: 'Error!', text: response.exception, icon: 'error', confirmButtonText: 'OK'})//alert
    //
    //         }
    //
    //     })
    // }

    toggleCollapse(): void {
        this.visible = !this.visible;
        // this.myloop = 8;
    }

    //     this.querydata={
    //         "Collegecode": 1,
    //         "Aadhaar": this.AadharSession,
    //         "Finyear": this.FinyearSession,
    //     }
    //     this.Queryticketservice.ticketDetails(this.querydata).subscribe(response => {
    //         console.log(response);
    //         if (response.data == true) {
    //             this.openYesNoDialog("Ticket details")
    //         }
    //         }
    // }

    xlsxUpload(element: any) {
        this.anyFile = element.target.files;
        console.log(this.anyFile);
    }

    uploadfile() {
        // let jsonin = {
        //     'Ticketid':
        // };
    }

    Closeticket() {
        alert('Are you sure you want to close the ticket?');
        let xyz = JSON.stringify(this.selectedRows)
        let jsonObj = JSON.parse(xyz);

        let closeticket = {
            Ticketid: parseInt(jsonObj[0].Ticketid),
            'Aadhaar': this.AadharSession,
            'Ticketaction': "CLOSE",
        }
        {
            this.commonService.Post_json(ticketaction,closeticket).subscribe((response) => {
                if (response == null) {
                    return;
                }
                if (response == true) {
                    this.globalmessage.Show_message('Ticket closed successfully');
                }
            });
        }

    }


    ReplyQuery() {

        if (this.selectedRows == null) {
            this.globalmessage.Show_message('please select ticket')
            return;
        }
        if (this.selectedRows[0].Ticketstatus == 'CLOSE') {
            this.globalmessage.Show_message('Ticket is already closed')
            return;
        }


        let xyz = JSON.stringify(this.selectedRows)
        let jsonObj = JSON.parse(xyz);

        let rquery = {
            Ticketid: parseInt(jsonObj[0].Ticketid),
            Aadhaar: this.AadharSession,
            Ticketdescription: this.ListEditorForm.controls['texteditorone'].value.replace(/<[^>]*>/g, ''),
            Useraadhaar: this.AadharSession,
            Adminname: this.admin,
        }

        {
            this.Queryticketservice.ticketReply(rquery).subscribe((response) => {

                    if (response == null) {
                        return;
                    }
                    if (response == jsonObj)
                        this.detailticket = response
                    this.globalmessage.Show_message('Ticket updated successfully')

                }
            );
        }
    }
}
