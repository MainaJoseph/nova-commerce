const HomeBanner = () => {
    return ( 
        <div className="relative bg-gradient-to-r from-amber-500 to-amber-700 mb-8">
            <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
                <div className="mb-8 md:mb-0 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Summer Sale</h1>
                    <p className="text-lg md:text-xl text-white mb-2">Enjoy Discounts on delected items</p>
                    <p className="text-2xl md:5xl text-black font-bold">GET UPTO 50% OFF</p>
                </div>
                <div></div>
            </div>
        </div>
     );
}
 
export default HomeBanner;