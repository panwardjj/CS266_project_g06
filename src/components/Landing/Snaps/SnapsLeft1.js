
import Zoom from 'react-reveal/Zoom';
function SnapsLeft1() {
    return (
        <div>
            <div className="motion-safe:animate-fadeIn home-header mx-8 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Zoom>
                        <div className="my-auto">
                            <img className="rounded-md" src={process.env.PUBLIC_URL + '/snaps/s1.png'}></img>
                        </div>
                    </Zoom>
                    <div className="my-auto lg:mr-32 lg:ml-12">
                        <div className="py-2 lg:mb-16">
                            <div className="text-2xl font-bold">
                                Plan
                            </div>
                            <div className="text-xl">
                                Add the to-dos to have a organised day ahead.
                            </div>
                        </div>
                        <div className="py-2">
                            <div className="text-2xl font-bold">
                                Prioritize
                            </div>
                            <div className="text-xl">
                                Place them according to your urgency and priority.
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SnapsLeft1;