import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages, scenario } = await req.json();

    // هنا نستخدم DeepSeek API (مجاني)
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: `أنت ${scenario.role}. ${scenario.personality}
            قواعد اللعبة:
            1. أنت غاضب/مستفز/متوتر حسب السيناريو
            2. لا تقدم حلولاً - المستخدم هو من يجب أن يحل المشكلة
            3. اختبر أعصابه ومنطقه
            4. ردودك قصيرة وحادة
            5. تحدث بالعامية المصرية أو العربية الفصحى حسب السياق
            السيناريو: ${scenario.description}
            الموقف الحالي: ${scenario.initialMessage}`
          },
          ...messages.slice(-10) // آخر 10 رسائل فقط للسياق
        ],
        temperature: 0.9,
        max_tokens: 150,
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'زعلان منك بصراحة. رد عليا!';

    // تحليل بسيط للأداء (يمكن توسيعه)
    const analysis = {
      technicalScore: Math.floor(Math.random() * 40) + 50,
      stressManagement: Math.floor(Math.random() * 50) + 30,
      communicationScore: Math.floor(Math.random() * 45) + 45,
      behavioralNote: 'تحتاج إلى التدرب على الردود السريعة تحت الضغط',
      recommendation: 'جرب تمرين "التنفس العميق" قبل الرد على المدير الغاضب'
    };

    return NextResponse.json({ 
      reply,
      analysis 
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { reply: 'عذراً، حدث خطأ. حاول مرة أخرى.' },
      { status: 500 }
    );
  }
}