const mockBookDetails = [
    {
        id: 1,
        status: "success",
        message: "조회 성공",
        data: {
            bookId: 1,
            title: "노인과 바다",
            category: "문학",
            bookCreated: "2025-01-01T10:00:00",
            bookUpdated: "2025-01-05T11:20:00",
            viewCount: 152,
            coverImageUrl: "https://picsum.photos/400?random=1",
            content: "노인이 바다에서 청새치와 싸우는 이야기.",
            description: "인간의 존엄성과 고독함을 그린 고전."
        }
    },
    {
        id: 2,
        status: "success",
        message: "조회 성공",
        data: {
            bookId: 2,
            title: "1984",
            category: "디스토피아",
            bookCreated: "2025-01-02T09:30:00",
            bookUpdated: "2025-01-06T14:10:00",
            viewCount: 298,
            coverImageUrl: "https://picsum.photos/400?random=2",
            content: "전체주의 감시 사회 속 한 남자의 이야기.",
            description: "자유와 통제, 감시 체제를 묘사한 작품."
        }
    },
    {
        id: 3,
        status: "success",
        message: "조회 성공",
        data: {
            bookId: 3,
            title: "동물농장",
            category: "풍자",
            bookCreated: "2025-01-03T12:00:00",
            bookUpdated: "2025-01-07T18:00:00",
            viewCount: 410,
            coverImageUrl: "https://picsum.photos/400?random=3",
            content: "'동물농장'은 한 농장에서 시작되는 이야기로, 동물들은 인간인 존스를 몰아내고 스스로의 힘으로 이상적인 공동체를 만들고자 한다. 그들의 목표는 모든 동물이 평등하고, 서로 협력하며, 인간의 지배나 착취가 없는 세상을 구현하는 것이었다. 초기에는 모든 것이 희망으로 가득했다. 동물들은 자신들이 직접 생산한 곡식과 노동을 나누며, 인간이 있을 때보다 더 많은 자유를 얻었다고 믿었다. 그들은 자신들의 규칙을 만들고 이를 '동물주의'라는 이름으로 부르며, 서로를 격려하고 새로운 사회를 세워 나갔다.\n" +
                "\n" +
                "하지만 시간이 지나면서 이 공동체는 점점 변하기 시작한다. 지도자 역할을 맡은 돼지들은 다른 동물들과 다르게 조금씩 특권을 요구하기 시작했고, 처음에는 미미했던 차이가 점점 뚜렷해졌다. 특히 나폴레온이라는 돼지는 권력을 독점하며 자신과 다른 돼지들에게만 이익이 되는 결정을 내렸다. 이는 동물주의의 근본 원칙과는 정면으로 충돌하는 것이었지만, 나폴레온은 설득과 선전, 그리고 공포를 이용해 다른 동물들을 침묵시키고 복종하게 만들었다.\n" +
                "\n" +
                "돼지들은 자신들이 더 똑똑하고 농장을 운영하는 데 필수적이라고 주장하며 점점 더 인간과 비슷한 삶을 살기 시작했다. 그들은 술을 마시고, 침대에서 자며, 이웃 인간들과 거래하는 등 초기의 금지된 행동들을 정당화했다. 하지만 그들은 매번 규칙을 슬쩍 바꿔가며 자신들의 행동에 합당한 의미를 부여했고, 다른 동물들은 교육받지 못한 탓에 이를 반박하지 못했다.\n" +
                "\n" +
                "특히 충성심 강한 말 '복서'는 체제의 근간이 되는 존재였다. 그는 나폴레온의 명령이라면 무조건 올바르다고 믿었고, 항상 “나는 더 열심히 일하겠다”라는 신념을 반복했다. 그러나 그는 자신의 충성과 노력에도 불구하고 결국 권력의 도구로만 이용되었고, 더 이상 일할 수 없게 되자 농장에서 필요 없는 존재로 취급되었다. 복서의 마지막은 다른 동물들에게 깊은 상처와 충격을 남겼으나, 돼지들은 이를 또 다른 선전의 수단으로 이용해 농장 운영 정당성을 강조했다.\n" +
                "\n" +
                "결국 농장은 동물들이 인간을 몰아내기 전보다 더 큰 불평등과 억압의 사회로 변모하게 된다. 돼지와 인간은 마침내 구분할 수 없을 정도로 닮아 있었고, 다른 동물들은 자신들이 왜 혁명을 일으켰는지조차 잊어버리고 그저 살아가는 것에 익숙해져 버렸다. 혁명은 형식만 남았을 뿐, 그들이 꿈꾸던 평등과 자유는 사라지고 권력과 지배만이 남았다.\n" +
                "\n" +
                "이 이야기는 단순한 동물 동화를 넘어, 권력이 어떻게 부패하며 이상이 어떻게 왜곡되는지를 보여주는 깊은 정치적 은유이다. 또한 무지, 선동, 권력 집중이 사회를 얼마나 쉽게 무너뜨릴 수 있는지 강한 메시지를 전달한다.\n",
            description: "권력과 타락을 비판한 조지 오웰의 명작."
        }
    },
    {
        id: 4,
        status: "success",
        message: "조회 성공",
        data: {
            bookId: 4,
            title: "데미안",
            category: "성장",
            bookCreated: "2025-01-04T15:10:00",
            bookUpdated: "2025-01-07T21:15:00",
            viewCount: 189,
            coverImageUrl: "https://picsum.photos/400?random=4",
            content: "자아를 찾아가는 한 소년의 여정.",
            description: "자기 발견과 정체성을 다룬 성장 소설."
        }
    },
    {
        id: 5,
        status: "success",
        message: "조회 성공",
        data: {
            bookId: 5,
            title: "호밀밭의 파수꾼",
            category: "청소년",
            bookCreated: "2025-01-05T19:40:00",
            bookUpdated: "2025-01-08T11:50:00",
            viewCount: 244,
            coverImageUrl: "https://picsum.photos/400?random=5",
            content: "어른 사회를 거부하는 소년의 이야기.",
            description: "불안, 성장, 반항을 그린 작품."
        }
    },
    {
        id: 6,
        status: "success",
        message: "조회 성공",
        data: {
            bookId: 6,
            title: "위대한 개츠비",
            category: "미국문학",
            bookCreated: "2025-01-06T09:25:00",
            bookUpdated: "2025-01-09T10:10:00",
            viewCount: 532,
            coverImageUrl: "https://picsum.photos/400?random=6",
            content: "개츠비의 사랑과 허무함 이야기.",
            description: "아메리칸 드림의 이면을 탐구한 소설."
        }
    },
    {
        id: 7,
        status: "success",
        message: "조회 성공",
        data: {
            bookId: 7,
            title: "죄와 벌",
            category: "러시아문학",
            bookCreated: "2025-01-07T14:45:00",
            bookUpdated: "2025-01-10T13:15:00",
            viewCount: 620,
            coverImageUrl: "https://picsum.photos/400?random=7",
            content: "죄책감에 시달리는 살인자의 심리.",
            description: "도스토예프스키 대표 철학 소설."
        }
    },
    {
        id: 8,
        status: "success",
        message: "조회 성공",
        data: {
            bookId: 8,
            title: "안나 카레니나",
            category: "고전",
            bookCreated: "2025-01-08T10:10:00",
            bookUpdated: "2025-01-11T11:30:00",
            viewCount: 355,
            coverImageUrl: "https://picsum.photos/400?random=8",
            content: "사랑과 선택에 대한 비극적 이야기.",
            description: "러시아 귀족 사회의 삶을 사실적으로 묘사."
        }
    },
    {
        id: 9,
        status: "success",
        message: "조회 성공",
        data: {
            bookId: 9,
            title: "모비딕",
            category: "모험",
            bookCreated: "2025-01-09T09:00:00",
            bookUpdated: "2025-01-12T14:00:00",
            viewCount: 401,
            coverImageUrl: "https://picsum.photos/400?random=9",
            content: "거대한 흰 고래를 쫓는 이야기.",
            description: "운명, 집착, 자연을 다룬 작품."
        }
    },
    {
        id: 10,
        status: "success",
        message: "조회 성공",
        data: {
            bookId: 10,
            title: "셜록 홈즈",
            category: "추리",
            bookCreated: "2025-01-10T13:10:00",
            bookUpdated: "2025-01-13T10:50:00",
            viewCount: 782,
            coverImageUrl: "https://picsum.photos/400?random=10",

            content: "천재 탐정 홈즈와 왓슨의 사건 기록.",
            description: "추리소설의 상징적인 캐릭터."
        }
    }
    ];

export default mockBookDetails;

