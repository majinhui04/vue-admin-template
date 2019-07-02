<script>
    export default {
        name: 'MenuItem',
        functional: true,
        props: {
            icon: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            },
            iconType: {
                type: String,
                default: ''
            }
        },
        render(h, context) {
            const { icon, title, iconType } = context.props;
            const cls = icon + ' svg-icon';
            const vnodes = [];

            if(iconType && icon) {
                vnodes.push(<svg-icon icon-class={icon}/>)
            }
            if (!iconType && icon) {
                vnodes.push(<i class={cls}/>)
            }
            if (!icon) {
                vnodes.push(<span class='placehoder'></span>)
            }
            if (title) {
                vnodes.push(<span slot='title'>{(title)}</span>)
            }
            return vnodes
        }
    }
</script>
