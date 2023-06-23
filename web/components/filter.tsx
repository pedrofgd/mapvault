import { FiFilter, FiGrid } from 'react-icons/fi'
import { FaSortAmountDownAlt } from 'react-icons/fa'
import styles from '../styles/Home.module.css'

export default function Filter() {
    return (
        <div className={`container d-flex fw-light 
                ${styles.filterBorder} py-1 mt-4 mb-2`} 
            style={{fontSize: "14px"}}>
                
            <div className="d-flex align-items-center">
                <FiFilter />
                <p className='m-2'>Filter to be develop</p>
            </div>

            <div className="d-flex align-items-center ms-4">
                <FaSortAmountDownAlt />
                <p className='m-2'>Sort to be develop</p>
            </div>

            <div className="d-flex align-items-center ms-4">
                <FiGrid />
                <p className='m-2'>Columns to be develop</p>
            </div>

        </div>
    )
}
