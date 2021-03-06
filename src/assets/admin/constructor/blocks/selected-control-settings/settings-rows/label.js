import slugify from 'slugify';

const { __ } = wp.i18n;

const { Component } = wp.element;

const {
    PanelBody,
    TextControl,
} = wp.components;

export default class LabelRow extends Component {
    constructor( ...args ) {
        super( ...args );

        this.generateUniqueName = this.generateUniqueName.bind( this );
    }

    generateUniqueName() {
        const {
            updateData,
            data,
        } = this.props;

        const {
            label = '',
            name = '',
        } = data;

        if ( ! label || name ) {
            return;
        }

        updateData( {
            name: slugify( label, {
                replacement: '-',
                lower: true,
                remove: /[^\w\s$0-9-*+~.$(_)#&|'"!:;@/\\]/g,
            } ),
        } );
    }

    render() {
        const {
            updateData,
            data,
        } = this.props;

        const {
            label = '',
        } = data;

        return (
            <PanelBody>
                <TextControl
                    label={ __( 'Label', '@@text_domain' ) }
                    help={ __( 'This is the name which will appear on the block edit control', '@@text_domain' ) }
                    value={ label }
                    onChange={ ( value ) => updateData( { label: value } ) }
                    onBlur={ this.generateUniqueName }
                    autoFocus
                />
            </PanelBody>
        );
    }
}
