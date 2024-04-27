import { ReactNode } from "react";

/**
 * Creates a multiplication table as a React component
 * @returns {ReactNode} The multiplication table component
 */
function createMultiplicationTable(size: number): ReactNode {
  return (
    <table className='table-auto border-collapse border border-slate-500 font-mono text-xl'>
      <tbody>
        {/* Generate table rows */}
        {[...Array(size)].map((_, rowIndex) => (
          <tr
            key={rowIndex}
            className={
              rowIndex === 0
                ? "sticky top-0 bg-slate-300"
                : `${rowIndex % 2 === 0 ? "bg-slate-100" : "bg-white"}`
            }
          >
            {/* Generate table cells for each row */}
            {[...Array(size)].map((_, colIndex) => (
              <td
                key={colIndex}
                className={`h-16 min-w-16 select-none border border-slate-600 text-center hover:bg-slate-200 ${rowIndex === 0 ? "sticky top-0 bg-slate-300" : colIndex === 0 ? "sticky left-0 bg-slate-300" : ""}`}
              >
                {/* Display row/column index for header cells, otherwise display the product */}
                {colIndex === 0 || rowIndex === 0
                  ? colIndex === 0
                    ? rowIndex
                    : colIndex
                  : colIndex * rowIndex}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function displayError(size: number | null) {
  if (size === null || size >= 0) return null;
  return (
    <p className='mt-0 pt-0 text-red-500'>Size must be a positive number</p>
  );
}

export default function Home(props: { searchParams: { size?: number } }) {
  const { searchParams } = props;
  const size = searchParams.size ? Number(searchParams.size) : null;
  console.log(size);

  if (size === null || size <= 0 || isNaN(size)) {
    return (
      <div className='flex h-screen flex-col items-center justify-center'>
        <h1 className='mb-8 text-6xl'>
          Welcome to{" "}
          <a className='text-blue-500 hover:underline' href='/'>
            MpTableGen
          </a>
        </h1>
        <p className='mb-4 text-xl'>
          Enter a size to generate a multiplication table
        </p>
        <form
          action='/'
          className='flex w-full max-w-xs flex-col items-start justify-center align-middle'
        >
          <input
            type='number'
            id='size'
            name='size'
            className='mb-0 h-full w-full appearance-none rounded-md border-2 border-slate-500 px-3 py-2 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          {displayError(size)}
          <button className='mt-4 w-full rounded bg-blue-500 px-4 py-3 font-bold text-white hover:bg-blue-700'>
            Go!
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className='flex overflow-visible'>
      {createMultiplicationTable(size)}
    </div>
  );
}
