import { Fragment, useState } from "react";
import type { Session } from "../types";
import { flushSync } from "react-dom";
import { Link } from "react-router";

export const SessionCard = ({
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
            <button className="cursor-pointer w-full flex justify-between items-center" onClick={toggleExpanded}>
                <p className="font-bold">{session.sessionDate.toLocaleDateString()}</p>
                <span className="text-3xl p-2" style={{ transition: 'all .3s ease', rotate: expanded ? '0deg' : '180deg' }}>^</span>
            </button>

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
