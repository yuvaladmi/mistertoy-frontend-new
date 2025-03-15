export function AboutUs() {



    function onStartAnimation() {
       console.log('Starting Animation!');
    }




    return (
        <section className="about-us">
            <section style={{ textAlign: 'center', marginBlock: '1em' }}>
                <button onClick={onStartAnimation}>Start Animation</button>
            </section>
            <h2>About Us</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni aperiam quo veniam velit dolor reprehenderit, laudantium consequatur neque numquam labore quae. Accusamus libero perferendis ducimus? Alias unde hic quisquam doloremque.</p>
            <img src="assets/img/react.png" />
        </section>
    )
}
