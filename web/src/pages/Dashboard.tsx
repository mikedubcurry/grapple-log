import { useState } from "react"
import { Link } from "react-router"
import { SessionCard } from "../components/SessionCard"

export const Dashboard = () => {
    const [statsFilter, setStatsFilter] = useState<'week' | 'month' | 'allTime'>('week')

    const data = {
        entries: [
            {
                id: 123,
                sessionDate: new Date('05/28/2026'),
                lastUpdated: new Date('05/28/2026'),
                arts: [
                    {
                        art: 'Muay Thai',
                        techniques: [
                            {
                                technique: 'elbows',
                                description: 'up elbow, off of the jab. keep other arm up in tight guard.'
                            },
                            {
                                technique: 'knees',
                                description: 'step in at angle to open hips. thrust hip and drive knee into solar plexis'
                            }
                        ],
                    },
                    {
                        art: 'BJJ',
                        techniques: [
                            {
                                technique: 'Kimura',
                                description: 'break posture, get deep underhook, apply shoulder crunch, open guard, cut angle on underhook side, grab wrist and lock in kimura'
                            },
                            {
                                technique: 'scissor sweep',
                                description: 'break posture, apply shounder crunch control, cut angle, slide underhook-side shin across abdomen, grab opposite side elbow, use opposite side leg to chop base, and kick underhook-side shin over, executing the sweep'
                            }
                        ]
                    }
                ],
                injuries: [{
                    injury: 'shoulder pain',
                    level: 2,
                    note: 'over threw during shadow boxing, shoulder feels a little sore'
                }]

            },
            {
                id: 124,
                sessionDate: new Date('05/29/2026'),
                lastUpdated: new Date('05/29/2026'),
                arts: [
                    {
                        art: 'Muay Thai',
                        techniques: [
                            {
                                technique: 'elbows',
                                description: 'up elbow, off of the jab. keep other arm up in tight guard.'
                            },
                            {
                                technique: 'knees',
                                description: 'step in at angle to open hips. thrust hip and drive knee into solar plexis'
                            }
                        ],
                    },
                    {
                        art: 'BJJ',
                        techniques: [
                            {
                                technique: 'Kimura',
                                description: 'break posture, get deep underhook, apply shoulder crunch, open guard, cut angle on underhook side, grab wrist and lock in kimura'
                            },
                            {
                                technique: 'scissor sweep',
                                description: 'break posture, apply shounder crunch control, cut angle, slide underhook-side shin across abdomen, grab opposite side elbow, use opposite side leg to chop base, and kick underhook-side shin over, executing the sweep'
                            }
                        ]
                    }
                ],
                injuries: [{
                    injury: 'shoulder pain',
                    level: 2,
                    note: 'over threw during shadow boxing, shoulder feels a little sore'
                }]

            }
        ].reverse(),
        stats: {
            week: {
                sessionCount: 4,
                artCount: 2,
                techniqueCount: 7,
            },
            month: {
                sessionCount: 20,
                artCount: 4,
                techniqueCount: 9,

            },
            allTime: {
                sessionCount: 114,
                artCount: 4,
                techniqueCount: 29,

            },
        },
    }

    return (
        <main className="h-screen mx-2 pt-2 flex flex-col gap-8">

            {/* stats */}
            <dl className="border text-2xl p-4">

                <div className="flex gap-2">
                    <dl>Sessions: </dl>
                    <dd className="underline">{data.stats[statsFilter].sessionCount}</dd>
                </div>
                <div className="flex gap-2">
                    <dl>Arts:</dl>
                    <dd className="underline">{data.stats[statsFilter].artCount}</dd>
                </div>

                <div className="flex gap-2">
                    <dl>Tech:</dl>
                    <dd className="underline">{data.stats[statsFilter].techniqueCount}</dd>
                </div>

                <span className="text-lg ">
                    <button className={`border px-2 ${statsFilter === 'week' ? 'bg-gray-200' : ''}`} onClick={() => setStatsFilter('week')}>W</button>
                    <button className={`border px-2 ${statsFilter === 'month' ? 'bg-gray-200' : ''}`} onClick={() => setStatsFilter('month')}>M</button>
                    <button className={`border px-2 ${statsFilter === 'allTime' ? 'bg-gray-200' : ''}`} onClick={() => setStatsFilter('allTime')}>A</button>
                </span>
            </dl>

            <Link to='/session/create' className="text-center w-full border rounded-full p-2">New Entry</Link>

            {/* session list */}
            <div className="flex flex-col gap-4">
                {data.entries.map(session => (
                    <SessionCard session={session} key={session.id} />
                ))}
            </div>

        </main>
    )
}

