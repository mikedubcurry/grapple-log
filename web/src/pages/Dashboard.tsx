import { Fragment, useState } from "react"
import { flushSync } from "react-dom"
import { Link } from "react-router"

export const Dashboard = () => {
    const [statsFilter, setStatsFilter] = useState<'week' | 'month' | 'allTime'>('week')
    const [expanded, setExpanded] = useState(false);

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
        ],
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

    const handleTransition = () => {
        if (!document.startViewTransition) {
            console.log('no view transition')
            setExpanded(!expanded)
            return
        }
        document.startViewTransition(() => {
            flushSync(() => {
                setExpanded(!expanded)
            })
        })
    }
    return (
        <main className="h-screen m-2 flex flex-col gap-8">

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

type Session = {
    id: number;
    sessionDate: Date;
    lastUpdated: Date;
    arts: Art[];
    injuries: Injury[];
}

type Art = {
    art: string;
    techniques: Technique[];
}

type Injury = {
    injury: string;
    level: number;
    note: string;
}


type Technique = {
    technique: string;
    description: string;
}

const SessionCard = ({
    session
}: {
    session: Session;
}) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        if (!document.startViewTransition) {
            setExpanded(!expanded);
            return;
        }

        document.startViewTransition(() => {
            flushSync(() => {
                setExpanded(!expanded)
            })
        })
    }
    return (
        <div
            className="border p-4"
            style={{ viewTransitionName: `session-card-${session.id}` }}
        >
            <div className="flex justify-between items-center">
                <p className="font-bold">{session.sessionDate.toLocaleDateString()}</p>
                <button className="text-3xl p-2" onClick={toggleExpanded} style={{ transition: 'all .3s ease', rotate: expanded ? '0deg' : '180deg' }}>^</button>
            </div>

            {session.arts.map(art => (
                <Fragment key={art.art}>
                    <p className="underline" style={{ viewTransitionName: `session-${session.id}-${art.art.replace(/\s+/g, '-')}` }}>{art.art}</p>
                    <ul className="pl-8 list-disc" style={{ viewTransitionName: `art-list-${session.id}-${art.art.replace(/\s+/g, '-')}` }}>
                        {expanded && art.techniques.map(tech => (
                            <li key={tech.technique}>{tech.technique}</li>
                        ))}
                    </ul>
                </Fragment>
            ))}
            <Link to={`/session/${session.id}`} className="py-4 text-xl"><span className="underline">Details</span>&#8614;</Link>
            <p className="">Last Updated: {session.lastUpdated.toLocaleDateString()}</p>
        </div>
    )
}
