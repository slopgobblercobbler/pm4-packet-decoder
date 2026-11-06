#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItSetContextRegOffsetDef {
    static constexpr std::uint8_t opcode = 0x6b;
    static constexpr std::string_view name = "IT_SET_CONTEXT_REG_OFFSET";
    static constexpr std::string_view desc = "Set base offset index for subsequent context register writes";
};
}
