export const pagination = {
    data() {
        return {
            size: 7,
            prev: 7,
            active: 0
        }
    },
    methods: {
        resetPage() {
            this.active = 0;
            this.size = 7;
            this.prev = 7;
        },
        currentPage(index) {
            this.active = index;
            this.dataTable();
        },
        allPage() {
            if(this.size < this.dataSets.totalSize && this.size !== '') {
                this.size = '';
                this.active = 0;

                this.prev = 0;
                this.loading.table = true;
                this.dataTable();
            }
        },
        listSize(number) {
            if(this.prev === number) {
                return false;
            }
            else if(number !== this.size && number < this.dataSets.totalSize) {
                this.size = number;
                this.active = 0;

                this.loading.table = true;
                this.prev = number;
                this.dataTable();
            } else {
                this.prev = number;
                this.allPage();
            }
        },
    }
}