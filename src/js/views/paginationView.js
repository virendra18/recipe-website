import icons from '../../img/icons.svg';
import View from './view.js';



class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');
    _errorMessage = `No recipe found for your query! Please try another one`
    _message = ``;


    addHandlerClick(handler){
        this._parentElement.addEventListener('click',function(e){
            const btn=e.target.closest('.btn--inline')
            if (!btn) return
            // console.log(btn);
            const goToPage=+btn.dataset.goto;
            // console.log(goToPage);
            handler(goToPage);
        })
    }
    _generateMarkup() {
        const currPage=this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        console.log(numPages);

        //Page1, and there are other pages
        if (currPage === 1 && numPages > 1) {
            return `
            <button data-goto="${currPage+1}" class="btn--inline pagination__btn--next">
            <span>Page ${currPage+1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> 
          `
        }
        // Last page
        if (currPage === numPages&&numPages > 1) {
            return `
            <button data-goto="${currPage-1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage-1}</span>
          </button>
            `
        }
        // other page
        if (currPage < numPages) {
            return `
            <button data-goto="${currPage-1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage-1}</span>
          </button>
          <button data-goto="${currPage+1}" class="btn--inline pagination__btn--next">
            <span>Page ${currPage+1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> 
          
            `
        }


        //Page1, and there are NO pages
        return ''

    }
}


export default new PaginationView();


/*
<button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page 1</span>
          </button>
          <button class="btn--inline pagination__btn--next">
            <span>Page 3</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </button> 


*/