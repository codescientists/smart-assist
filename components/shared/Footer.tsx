import Link from 'next/link'
import { Separator } from '../ui/separator'
import { FacebookIcon, HousePlugIcon, InstagramIcon, Twitter, YoutubeIcon } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="px-5 lg:px-32 py-10 bg-slate-800 text-white">
        <div className="grid grid-cols-8">
            <div className="col-span-8 md:col-span-4 lg:col-span-2">
              <div className="flex flex-col items-start">
                <Link href={`/`} className="font-semibold italic text-lg flex items-center md:text-xl"> <HousePlugIcon className="mr-2" /> HomeShine</Link>

                <p className="text-slate-200 mt-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, hic.
                </p>
              </div>
              
            </div>
            <div className="col-span-8 md:col-span-4 lg:col-span-2">
                <h1 className="text-md font-bold mt-4 mb-2">Account</h1>
                <ul>
                    <li className="my-1 text-start">
                        <Link href={`/`} className="custom-link text-sm text-slate-200">Your account</Link>
                    </li>
                    <li className="my-1 text-start">
                        <Link href={`/`} className="custom-link text-sm text-slate-200">Shipping & policies</Link>
                    </li>
                    <li className="my-1 text-start">
                        <Link href={`/`} className="custom-link text-sm text-slate-200">Refunds & Replacements</Link>
                    </li>
                    <li className="my-1 text-start">
                        <Link href={`/`} className="custom-link text-sm text-slate-200">Order tracking</Link>
                    </li>
                </ul>
            </div>
            <div className="col-span-8 md:col-span-4 lg:col-span-2">
                <h1 className="text-md font-bold mt-4 mb-2">Customer services</h1>
                <ul>
                    <li className="my-1 text-start">
                        <Link href={`/`} className="custom-link text-sm text-slate-200">Payments methods</Link>
                    </li>
                    <li className="my-1 text-start">
                        <Link href={`/`} className="custom-link text-sm text-slate-200">Money back guarantee</Link>
                    </li>
                    <li className="my-1 text-start">
                        <Link href={`/`} className="custom-link text-sm text-slate-200">Product returns</Link>
                    </li>
                    <li className="my-1 text-start">
                        <Link href={`/`} className="custom-link text-sm text-slate-200">Support center</Link>
                    </li>
                </ul>
            </div>
            <div className="col-span-8 md:col-span-4 lg:col-span-2">
                <h1 className="text-md font-bold mt-4 mb-4">Social Media</h1>
                <ul className='flex items-center'>
                    <li className="mr-5">
                        <Link href={`/`} className="text-sm text-slate-200">
                            <InstagramIcon />
                        </Link>
                    </li>
                    <li className="mr-5">
                        <Link href={`/`} className="text-sm text-slate-200">
                            <FacebookIcon />
                        </Link>
                    </li>
                    <li className="mr-5">
                        <Link href={`/`} className="text-sm text-slate-200">
                            <Twitter />
                        </Link>
                    </li>
                    <li className="mr-5">
                        <Link href={`/`} className="text-sm text-slate-200">
                            <YoutubeIcon />
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
        <Separator className="my-6"/>
        <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm">© All rights reserved. Made by <Link href={`/`} className="custom-link">HomeShine</Link></p>
            <div className="flex items-center">
                <img src="https://cartzilla.createx.studio/assets/img/payment-methods/visa-light-mode.svg" alt="" />
                <img src="https://cartzilla.createx.studio/assets/img/payment-methods/paypal-light-mode.svg" alt="" />
                <img src="https://cartzilla.createx.studio/assets/img/payment-methods/mastercard.svg" alt="" />
                <img src="https://cartzilla.createx.studio/assets/img/payment-methods/google-pay-light-mode.svg" alt="" />
                <img src="https://cartzilla.createx.studio/assets/img/payment-methods/apple-pay-light-mode.svg" alt="" />
            </div>
        </div>
    </footer>
  )
}

export default Footer