import { templates } from './templates';

interface TemplateData {
    [key: string]: string;
}

interface EmailTemplateStructure {
    subject: string;
    text: string;
    html: string;
}

class EmailTemplate {
    private template: EmailTemplateStructure;

    constructor(templateName: keyof typeof templates) {
        if (!(templateName in templates)) {
            throw new Error(`Template ${templateName} does not exist`);
        }
        this.template = templates[templateName];
    }

    public getSubject(data: TemplateData): string {
        return this.interpolate(this.template.subject, data);
    }

    public getText(data: TemplateData): string {
        return this.interpolate(this.template.text, data);
    }

    public getHtml(data: TemplateData): string {
        return this.interpolate(this.template.html, data);
    }

    private interpolate(template: string, data: TemplateData): string {
        return template.replace(/{(\w+)}/g, (_, key) => data[key] || '');
    }
}

export default EmailTemplate;
