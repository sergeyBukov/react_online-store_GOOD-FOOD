import React from "react";
import "./ProductsList.scss";
import Card from "../Card/Card";
import useFetch from "../../hooks/useFetch";
import {useSelector} from "react-redux";
import TablePagination from "@mui/material/TablePagination";
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import {TableCell} from "@mui/material";


const ProductsList = ({subCats, maxPrice, sort, catId, view}) => {

    // start of pagination
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(8);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 8));
        setPage(0);
    };
    //end of pagination

    const {data, loading, error} = useFetch(
        `/products?populate=*&[filters][categories][id]=${catId}${subCats.map(
            (item) => `&[filters][sub_categories][id][$eq]=${item}`
        )}&[filters][price][$lte]=${maxPrice}&sort=price:${sort}`
    );

    const filteredValue = useSelector((state) => state.search.inputValue)
    // console.log('filteredValue', filteredValue)

    const filtredItems = data?.filter((item) =>
        item.attributes.title.toLowerCase().includes(filteredValue.toLowerCase())
    );

    //START of emptyRows*
    //Добавляем, emptyRows чтобы Overlay не дергался, когда на последней странице список заполнен не полностью
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filtredItems?.length) : 0;
    //END of emptyRows**

    return (
        <>
            <TablePagination
                rowsPerPageOptions={[8, 16, 24]}
                component="div"
                count={filtredItems?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {error
                ? <Alert severity="error">Something went wrong!</Alert>
                : loading
                    ?
                    <LinearProgress color="success"/>
                    :
                    <div
                        className={view ? `${'products-box products-box--tile'}` : `${'products-box products-box--list'}`}>
                        {filtredItems?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((item) => {
                                return (<Card item={item} key={item.attributes.title} view={view}/>)
                            })}

                    </div>
            }
            {emptyRows > 0 && (
                <div
                    style={view ? {
                        height: 336,
                    } : {
                        height: 90 * emptyRows,
                    }}
                >
                    <TableCell colSpan={8}/>
                </div>
            )}
            <TablePagination
                rowsPerPageOptions={[8, 16, 24]}
                component="div"
                count={filtredItems?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

        </>
    );
};

export default ProductsList;
