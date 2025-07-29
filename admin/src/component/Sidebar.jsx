import React, { useState } from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { MdDashboard } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { FiDivide, FiX, FiMinus, FiPlus, FiPercent } from 'react-icons/fi';

// --- NEW: Mini Calculator Component ---
const MiniCalculator = () => {
    const [display, setDisplay] = useState('0');
    const [expression, setExpression] = useState(''); // For showing the running calculation
    const [firstOperand, setFirstOperand] = useState(null);
    const [operator, setOperator] = useState(null);
    const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

    const inputDigit = (digit) => {
        if (waitingForSecondOperand) {
            setDisplay(String(digit));
            setWaitingForSecondOperand(false);
        } else {
            setDisplay(display === '0' ? String(digit) : display + digit);
        }
    };

    const inputDecimal = () => {
        if (!display.includes('.')) setDisplay(display + '.');
    };

    const clearDisplay = () => {
        setDisplay('0');
        setExpression('');
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
    };

    const toggleSign = () => {
        setDisplay(String(parseFloat(display) * -1));
    };

    const inputPercent = () => {
        const currentValue = parseFloat(display);
        const result = currentValue / 100;
        setDisplay(String(result));
        setExpression(`${currentValue}%`);
        setWaitingForSecondOperand(true);
    };

    const performOperation = (nextOperator) => {
        const inputValue = parseFloat(display);

        if (nextOperator === '=') {
            if (operator && firstOperand !== null) {
                const result = calculate(firstOperand, inputValue, operator);
                const formattedResult = parseFloat(result.toPrecision(12));
                setExpression(`${firstOperand} ${operator} ${inputValue} =`);
                setDisplay(String(formattedResult));
                setFirstOperand(null);
                setOperator(null);
                setWaitingForSecondOperand(true);
            }
            return;
        }

        // Handle chained operations (e.g., 10 + 5 * 2)
        if (operator && !waitingForSecondOperand) {
            const result = calculate(firstOperand, inputValue, operator);
            const formattedResult = parseFloat(result.toPrecision(12));
            setDisplay(String(formattedResult));
            setFirstOperand(formattedResult);
            setExpression(`${formattedResult} ${nextOperator}`);
        } else {
            setFirstOperand(inputValue);
            setExpression(`${inputValue} ${nextOperator}`);
        }

        setWaitingForSecondOperand(true);
        setOperator(nextOperator);
    };

    const calculate = (first, second, op) => {
        switch (op) {
            case '+': return first + second;
            case '-': return first - second;
            case '*': return first * second;
            case '/': return second === 0 ? 'Error' : first / second;
            default: return second;
        }
    };
    
    const CalcButton = ({ onClick, children, className = '' }) => (
        <button
            onClick={onClick}
            className={`font-semibold rounded-lg h-10 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-amber-500 active:scale-95 text-sm ${className}`}
        >
            {children}
        </button>
    );

    return (
        <div className="bg-gray-800 p-2 rounded-lg shadow-inner mt-6">
            {/* --- FIX: Added a secondary display for the expression --- */}
            <div className="bg-gray-900/50 text-white text-right p-2 rounded-md mb-2 h-16 flex flex-col items-end justify-end">
                <p className="text-xs text-gray-400 h-5">{expression}</p>
                <p className="text-2xl font-mono break-all line-clamp-1">{display}</p>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
                <CalcButton onClick={clearDisplay} className="bg-zinc-400 text-black hover:bg-zinc-500">AC</CalcButton>
                <CalcButton onClick={toggleSign} className="bg-zinc-400 text-black hover:bg-zinc-500">+/-</CalcButton>
                <CalcButton onClick={inputPercent} className="bg-zinc-400 text-black hover:bg-zinc-500"><FiPercent size={16}/></CalcButton>
                <CalcButton onClick={() => performOperation('/')} className="bg-amber-500 text-white hover:bg-amber-600"><FiDivide size={16}/></CalcButton>

                <CalcButton onClick={() => inputDigit(7)} className="bg-zinc-600 text-white hover:bg-zinc-700">7</CalcButton>
                <CalcButton onClick={() => inputDigit(8)} className="bg-zinc-600 text-white hover:bg-zinc-700">8</CalcButton>
                <CalcButton onClick={() => inputDigit(9)} className="bg-zinc-600 text-white hover:bg-zinc-700">9</CalcButton>
                <CalcButton onClick={() => performOperation('*')} className="bg-amber-500 text-white hover:bg-amber-600"><FiX size={16}/></CalcButton>

                <CalcButton onClick={() => inputDigit(4)} className="bg-zinc-600 text-white hover:bg-zinc-700">4</CalcButton>
                <CalcButton onClick={() => inputDigit(5)} className="bg-zinc-600 text-white hover:bg-zinc-700">5</CalcButton>
                <CalcButton onClick={() => inputDigit(6)} className="bg-zinc-600 text-white hover:bg-zinc-700">6</CalcButton>
                <CalcButton onClick={() => performOperation('-')} className="bg-amber-500 text-white hover:bg-amber-600"><FiMinus size={16}/></CalcButton>

                <CalcButton onClick={() => inputDigit(1)} className="bg-zinc-600 text-white hover:bg-zinc-700">1</CalcButton>
                <CalcButton onClick={() => inputDigit(2)} className="bg-zinc-600 text-white hover:bg-zinc-700">2</CalcButton>
                <CalcButton onClick={() => inputDigit(3)} className="bg-zinc-600 text-white hover:bg-zinc-700">3</CalcButton>
                <CalcButton onClick={() => performOperation('+')} className="bg-amber-500 text-white hover:bg-amber-600"><FiPlus size={16}/></CalcButton>
                
                <CalcButton onClick={() => inputDigit(0)} className="col-span-2 bg-zinc-600 text-white hover:bg-zinc-700">0</CalcButton>
                <CalcButton onClick={inputDecimal} className="bg-zinc-600 text-white hover:bg-zinc-700">.</CalcButton>
                <CalcButton onClick={() => performOperation('=')} className="bg-amber-500 text-white hover:bg-amber-600">=</CalcButton>
            </div>
        </div>
    );
};


function Sidebar() {
    let navigate = useNavigate();
    return (
        <div className='w-[18%] min-h-[100vh] border-r border-gray-300 py-12 fixed left-0 top-0 bg-[#f8e5d6] text-gray-800 shadow-md'>
            <div className='flex flex-col gap-3 pt-8 pl-[18%] pr-6 text-sm font-medium'>

                {/* Dashboard Option */}
                <div
                    className='flex items-center gap-4 px-5 py-3 cursor-pointer rounded-lg hover:bg-[#e0cba0] hover:text-[#5e4b30] transition-all duration-200 ease-in-out group'
                    onClick={() => navigate('/')}
                >
                    <MdDashboard className='w-5 h-5 text-[#8b6e4d] group-hover:text-[#5e4b30] transition-colors duration-200'/>
                    <p className='hidden md:block'>Dashboard</p>
                </div>

                <div
                    className='flex items-center gap-4 px-5 py-3 cursor-pointer rounded-lg hover:bg-[#e0cba0] hover:text-[#5e4b30] transition-all duration-200 ease-in-out group'
                    onClick={() => navigate('/add')}
                >
                    <IoIosAddCircleOutline className='w-5 h-5 text-[#8b6e4d] group-hover:text-[#5e4b30] transition-colors duration-200'/>
                    <p className='hidden md:block'>Add Items</p>
                </div>

                <div
                    className='flex items-center gap-4 px-5 py-3 cursor-pointer rounded-lg hover:bg-[#e0cba0] hover:text-[#5e4b30] transition-all duration-200 ease-in-out group'
                    onClick={() => navigate('/lists')}
                >
                    <FaRegListAlt className='w-5 h-5 text-[#8b6e4d] group-hover:text-[#5e4b30] transition-colors duration-200'/>
                    <p className='hidden md:block'>List Items</p>
                </div>

                <div
                    className='flex items-center gap-4 px-5 py-3 cursor-pointer rounded-lg hover:bg-[#e0cba0] hover:text-[#5e4b30] transition-all duration-200 ease-in-out group'
                    onClick={() => navigate('/orders')}
                >
                    <SiTicktick className='w-5 h-5 text-[#8b6e4d] group-hover:text-[#5e4b30] transition-colors duration-200'/>
                    <p className='hidden md:block'>View Orders</p>
                </div>

                {/* --- Calculator added below View Orders --- */}
                <div className="mt-auto pt-6 border-t border-gray-300">
                    <MiniCalculator />
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
