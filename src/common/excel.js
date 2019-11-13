import XLSX from 'xlsx';
import state from '@/store/state/state.js';

const errorMessage = '검색 결과가 없습니다';
const excel = arg => {
    try{
        let size = state.dataSets.contents.length;

        if(size === 0) {
            throw errorMessage;
        }

        if(arg.total !== '' && arg.total < state.dataSets.totalSize) {
            alert("현재 리스트만 엑셀 다운로드 됩니다.\n리스트 전체를 다운 받을려면 '리스트 전체보기'클릭 후 다운로드 하시면 됩니다.");
        }

        let data = arg.table;
        let fileName = arg.fileName;
        let wb = XLSX.utils.book_new();
        let dataWS =  XLSX.utils.table_to_sheet(data, {raw: true});
        let sheetName = fileName.split('.').slice(0, 1);
        let colWidth = [];
        let autoWidth = true;

        if (autoWidth) {
            data.querySelectorAll('th').forEach(th => {
                let p = th.childNodes[0].innerHTML;

                if(th.getAttribute('colspan') === null) {
                    colWidth.push({
                        'wch' : p.length + 3
                    });
                }
            });

            data.querySelectorAll('td .table-row').forEach((td, i) => {
                let text = td.innerHTML.length + 3;
                let index = i % colWidth.length;

                if(text > colWidth[index].wch) {
                    colWidth[index] = {
                        'wch' : text
                    }
                }
            });
            dataWS['!cols'] = colWidth;
        }

        XLSX.utils.book_append_sheet(wb, dataWS, sheetName[0]);

        // export Excel file
        XLSX.writeFile(wb, fileName, { bookType: 'xlsx', type: 'binary' });
    }
    catch (err) {
        alert(err);
    }
};

export default excel;