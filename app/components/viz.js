const React = require('react');
const propTypes = require('prop-types');
import Graph from 'react-graph-vis'

class Viz extends React.Component {
    render() {
        let edges = [], nodes = [];
        const {data = {apps: []}} = this.props;
        const {apps = []} = data;
        console.log({apps});
        if (!apps) return null;
        apps.forEach(({name, processes}) => {
            const appGuid = `app-${name}`
            nodes.push({id: appGuid, label: `${name}`});
            edges.push({from: 'account', to: appGuid})
            processes.forEach(({guid, instances, type}) => {
                nodes.push({id: guid, label: `processes ${type}`, color: 'gold'});
                edges.push({from: appGuid, to: guid});
                instances.forEach(({actual_memory_mb}, index) => {
                    let instanceGuid = `instance-${index}-${guid}`;
                    nodes.push({id: instanceGuid, label: `${actual_memory_mb} MB`, color: 'darksalmon', shape: 'box'});
                    edges.push({from: guid, to: instanceGuid});
                });
            });
        });
        nodes.push({id: 'account', label: 'My Account', shape: 'star'})
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
                hierarchical: true
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
                <Graph graph={graph} options={options} events={events} style={{ width: '1280x', height: '800px' }}/>
                <pre>{JSON.stringify(data, undefined, 2)}</pre>
            </div>
        );
    };
}

module.exports = Viz;
