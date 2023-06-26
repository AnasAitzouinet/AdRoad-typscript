"use client"
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid'
import { GiTakeMyMoney , GiMoneyStack } from 'react-icons/gi'
import { VscProject } from 'react-icons/vsc'
const stats = [
  { id: 1, name: 'Potential Earns', stat: '1800 Dh', icon: GiTakeMyMoney, change: '122', changeType: 'increase' },
  { id: 2, name: 'Campaigns Taken', stat: '5', icon: VscProject, change: '5.4%', changeType: 'increase' },
  { id: 3, name: 'My Earnings', stat: '900 Dh', icon: GiMoneyStack, change: '3.2%', changeType: 'decrease' },
]

function classNames(...classes : any[] ) {
  return classes.filter(Boolean).join(' ')
}

export default function CardsEarn() {
  return (
    <div>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-lg bg-gray-900 px-4 pt-5  shadow-lg sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-slate-200 p-3">
                <item.icon className="h-6 w-6 text-gray-900" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-400">{item.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-white">{item.stat}</p>
              <p
                className={classNames(
                  item.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                  'ml-2 flex items-baseline text-sm font-semibold'
                )}
              >
                {item.changeType === 'increase' ? (
                  <ArrowUpIcon className="h-5 w-5 flex-shrink-0 self-center text-green-500" aria-hidden="true" />
                ) : (
                  <ArrowDownIcon className="h-5 w-5 flex-shrink-0 self-center text-red-500" aria-hidden="true" />
                )}

                <span className="sr-only"> {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
                {item.change}
              </p>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
