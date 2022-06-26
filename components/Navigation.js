import Image from 'next/image'

const Navigation = () => {
    const ButtonStyle = `
    bg-lens-300
    hover:bg-green-600
    text-white
    py-3
    px-5
    rounded-full
    shadow-custom
    mt-80
    ml-9
    `
  
    const NavStyle = `
    bg-white w-4/12 flex flex-row pl-12
    `

    return (
        <nav className={NavStyle}>
            <div className='mt-40 flex-row'>
                <Image src="/gard3n-logo.svg" height={110} width={110} alt="gard3n-logo" />
                <h1 className='text-center text-3xl'>Gard3n</h1>
                <div className='pt-24 text-xl'>
                    <h1 className=''>Home</h1>
                    <h1 className=''>Explore</h1>
                    <h1 className=''>Notifications</h1>
                    <h1 className=''>Settings</h1>
                </div>
                <button className={ButtonStyle}>Create</button>
            </div>
        </nav>
    )
}

export default Navigation