'use client'
import variables from '@/styles/variables.module.scss'

import { useEffect, useState } from 'react'

type DobProps = {
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function Dob(props: DobProps) {

    const { onChange } = props;

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]

    const defaultDays: { [key: number]: number } = {
        1: 31,
        2: 28,
        3: 31,
        4: 30,
        5: 31,
        6: 30,
        7: 31,
        8: 31,
        9: 30,
        10: 31,
        11: 30,
        12: 31
    }

    const [totalDays, setTotalDays] = useState<number>(31)

    const currentYear = new Date().getFullYear()

    const [month, setMonth] = useState<string>('0')
    const [day, setDay] = useState<string>('0')
    const [year, setYear] = useState<string>('0')

    const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDay(e.target.value)
        onChange(e);
    }

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e);
        setMonth(e.target.value)
        setTotalDays(defaultDays[parseInt(e.target.value)])
        const tempDay = parseInt(day)
        if(tempDay !== 0 && tempDay > totalDays) {
            setDay('0')
        }

    }

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setYear(e.target.value)
        onChange(e);
        if(parseInt(year) !== 0 && parseInt(month) !== 0) {
            const tempDays = new Date(parseInt(e.target.value), parseInt(month), 0).getDate()
            setTotalDays(tempDays)
        }
    }

    useEffect(() => {
    }, [totalDays, day, month, year])

    return (
        <div className='flex flex-col gap-2'>
            <h1 className="text-xl">Date of Birth</h1>
            <p className="text-sm text-gray-500">This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</p>
            <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col gap-2">
                    <label htmlFor="month">Month</label>
                    <div className={`${variables['inputGroup']} w-full !p-0 !pr-2`}>
                        <select value={month} onChange={handleMonthChange} className={`${variables['input']} ${variables['select']} !bg-black w-full`} name="month" id="month">
                            <option value="0"  disabled>Select Month</option>
                            {months.map((month, index) => ( <option key={index} value={index + 1}>{month}</option>))}
                        </select>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="day">Day</label>
                    <div className={`${variables['inputGroup']} w-full  !p-0 !pr-2`}>
                        <select value={day} onChange={handleDayChange}  className={`${variables['input']} ${variables['select']} !bg-black w-full`} name="year" id="year">
                            <option value="0" disabled>Select Day</option>
                            {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => ( <option key={day} value={day}>{day}</option>))}
                        </select>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="year">Year</label>
                    <div className={`${variables['inputGroup']} w-full  !p-0 !pr-2`}>
                        <select value={year} onChange={handleYearChange} className={`${variables['input']} ${variables['select']} !bg-black w-full`} name="year" id="year">
                            <option value="0" disabled>Select Year</option>
                            {Array.from({ length: 100 }, (_, i) => currentYear - i ).map((year) => ( <option key={year} value={year}>{year}</option>))}
                        </select>
                    </div>
                </div>
                
                
            </div>
        </div>
    )

}