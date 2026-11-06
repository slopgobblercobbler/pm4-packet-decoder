#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItSetContextRegIndexDef {
    static constexpr std::uint8_t opcode = 0x9f;
    static constexpr std::string_view name = "IT_SET_CONTEXT_REG_INDEX";
    static constexpr std::string_view desc = "Set context register with indexed offset resolution";
};
}
