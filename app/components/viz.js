const React = require('react');
const propTypes = require('prop-types');
import Graph from 'react-graph-vis'

class Viz extends React.Component {
    render() {
        let edges = [], nodes = [], legendNodes = [], legendEdges =[];
        const {data = {apps: [], tasks: []}} = this.props;
        const {apps = [], tasks = []} = data;
        console.log({apps, tasks});
        if (!apps || !tasks) return null;
        // Legend

        legendNodes.push({id: 1, label: 'Application', level: 1});
        legendNodes.push({id: 0, label: 'Process', level: 0, color: 'gold'});
        legendNodes.push({id: -1, label: 'Instance', level: -1, color: 'darksalmon', shape: 'dot', size: 12})
        legendNodes.push({id: -2, label: 'Route', level: -2, shape: 'text'})
        legendNodes.push({id: 2, label: 'Package', level: 2, shape: 'dot', color: 'saddlebrown', size: 10})
        legendNodes.push({id: 3, label: 'Droplet', level: 3, shape: 'triangle', color: 'lightblue',})
        legendNodes.push({id: 3.1, label: 'Current Droplet', level: 3, shape: 'triangle', color: 'cornflowerblue',})
        // nodes.push({id: 2, label: 'Application'});
        // nodes.push({id: 3, label: 'Application'});
        // nodes.push({id: 4, label: 'Application'});
        legendNodes.push({id: 4, label: 'Task', level: 4, shape: 'text'});
        legendEdges.push({from: 4, to: 3.1});
        legendEdges.push({from: -2, to: 0})
        legendEdges.push({from: 0, to: -1})
        legendEdges.push({from: 1, to: 0})
        legendEdges.push({from: 1, to: 2})
        legendEdges.push({from: 1, to: 3})
        legendEdges.push({from: 1, to: 3.1})
        legendEdges.push({from: 3, to: 2})
        legendEdges.push({from: 3.1, to: 2})
        const legendGraph = {nodes: legendNodes, edges: legendEdges};
        ///
        apps.forEach(({name, processes, droplets, current_droplet, packages}) => {
            const appGuid = `app-${name}`

            nodes.push({id: appGuid, label: `${name}`, title: 'Application', level: 1});
            // edges.push({from: 'account', to: appGuid})
            processes.forEach(({guid, instances, type, routes}) => {
                const processGuid = guid;
                nodes.push({id: guid, label: `processes ${type}`, color: 'gold', title: 'Process', level: 0});
                edges.push({from: appGuid, to: guid});

                instances.forEach(({actual_memory_mb, index}) => {
                    let instanceGuid = `instance-${index}-${guid}`;
                    nodes.push({id: instanceGuid, label: `instance: ${index} (${actual_memory_mb} MB)`, color: 'darksalmon', shape: 'dot', size: 12, level: -1});
                    edges.push({from: guid, to: instanceGuid});
                });

                routes.forEach(({host, domain}) => {
                    const url = `${host}.${domain}`;
                    nodes.push({id: url, label: url, level: -2, shape: 'text', color: 'green'});
                    edges.push({to: processGuid, from: url});
                });
            });

            packages.filter(({state}) => state !== 'EXPIRED').forEach(({guid, state}) => {
                nodes.push({id: guid, label: `package ${state}`, shape: 'dot', color: 'saddlebrown', size: 10, level: 2});
                edges.push({from: appGuid, to: guid});
            });
            droplets.filter(({state}) => state !== 'EXPIRED').forEach(({guid, state, 'package': packageObj}) => {
                const currentGuid = current_droplet && current_droplet.guid
                const dropletColor = guid === currentGuid ? 'cornflowerblue' : 'lightblue';
                nodes.push({id: guid, label: `droplet ${state}`, shape: 'triangle', color: dropletColor, cid: appGuid, level: 3});
                edges.push({from: appGuid, to: guid});
                edges.push({from: guid, to: packageObj.guid});
            });
        });

        tasks.forEach(({command, name, droplet}) => {
            const taskGuid = command + name + droplet.guid;
            nodes.push({id: taskGuid, label: command, level: 4, shape: 'text'});
            edges.push({from: taskGuid, to: droplet.guid});
        });
        // nodes.push({id: 'account', label: 'My Account', shape: 'star'})
        console.log({data, apps, nodes})
        let graph = {
            nodes: [
                {id: 1, label: 'Node 1'},
                {id: 2, label: 'Node 2'},
                {id: 3, label: 'Node 3'},
                {id: 4, label: 'Node 4'},
                {id: 5, label: 'Node 5'}
            ],
            edges: [
                {from: 1, to: 2},
                {from: 1, to: 3},
                {from: 2, to: 4},
                {from: 2, to: 5}
            ]
        };
        if (nodes) {
            graph = {nodes, edges};
        }

        const options = {
            layout: {
                hierarchical: {
                    enabled: true,
                    levelSeparation: 125,
                }
            },
            edges: {
                color: '#000000'
            }
        };
        const events = {
            select: function (event) {
                const {nodes, edges} = event;
            }
        };
        return (
            <div>
                <h1>Grapi UI!</h1>
                <div style={{display: 'flex'}}>
                    <div>
                        <h2>Legend</h2>
                        <Graph graph={legendGraph} options={options} events={events} style={{ width: '80x', height: '950px', border: '1px solid black' }}/>
                    </div>
                    <Graph graph={graph} options={options} events={events} style={{ width: '1280x', height: '950px', flex: 1}}/>
                </div>
            </div>
        );
    };
}

module.exports = Viz;
