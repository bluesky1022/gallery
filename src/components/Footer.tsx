function Footer() {
    const day = new Date();
    return (
        <>
            {/* Footer */}
            <div className='h-[8vh] w-full bg-gray-900 text-[white] flex text-center items-center justify-center'>
                TaskView {day.getFullYear()} Management
            </div>
        </>
    )
}
export default Footer